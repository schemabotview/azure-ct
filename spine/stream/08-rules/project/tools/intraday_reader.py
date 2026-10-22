"""The intraday exposure reader: reads deal-events as consumer group
exposure-intraday and records how far it got, per partition, in the lake's
checkpoints container. Run it again and it carries on from there; with no
checkpoint yet it starts at the oldest event the hub still keeps.
"""
import os
import re
import threading
import time

from azure.eventhub import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblob import BlobCheckpointStore

HUB, GROUP = 'deal-events', 'exposure-intraday'
store = BlobCheckpointStore.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'], 'checkpoints')
reader = EventHubConsumerClient.from_connection_string(
    os.environ['EVENTHUBS_CONNECTION_STRING'], GROUP, eventhub_name=HUB,
    checkpoint_store=store, load_balancing_interval=1)
seen, reached = [], {}


def on_event(partition, event):
    if event is None:
        return
    seen.append((partition.partition_id, event.sequence_number,
                 event.body_as_json()))
    partition.update_checkpoint(event)  # after the event is handled
    reached[partition.partition_id] = event.sequence_number


# Read until every partition is caught up with what the hub holds now
host = re.search(r'sb://([^;/]+)', os.environ['EVENTHUBS_CONNECTION_STRING'])
for c in store.list_checkpoints(host.group(1), HUB, GROUP):
    reached[c['partition_id']] = c['sequence_number']
latest = {p: reader.get_partition_properties(p)['last_enqueued_sequence_number']
          for p in reader.get_partition_ids()}
threading.Thread(target=reader.receive, daemon=True, kwargs=dict(
    on_event=on_event, max_wait_time=1, starting_position='-1')).start()
while any(reached.get(p, -1) < last for p, last in latest.items()):
    time.sleep(0.5)
reader.close()
for partition, number, body in sorted(seen, key=lambda s: s[:2]):
    print(f"partition {partition} #{number}  {body['key']} {body['event']}")
print(f"{len(seen)} read, checkpoint saved")
