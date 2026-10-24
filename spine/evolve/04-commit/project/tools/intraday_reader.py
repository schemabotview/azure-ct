"""The intraday exposure reader: reads deal-events as consumer group
exposure-intraday and records how far it got, per partition, in the lake's
checkpoints container. Run it again and it carries on from there; with no
checkpoint yet it starts at the oldest event the hub still keeps.
"""
import os
import threading
import time

from azure.eventhub import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblob import BlobCheckpointStore

store = BlobCheckpointStore.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'], 'checkpoints')
reader = EventHubConsumerClient.from_connection_string(
    os.environ['EVENTHUBS_CONNECTION_STRING'], 'exposure-intraday',
    eventhub_name='deal-events', checkpoint_store=store,
    load_balancing_interval=1)
seen, claimed, last = [], set(), [time.monotonic()]


def on_event(partition, event):
    if event is None:
        return
    seen.append((partition.partition_id, event.sequence_number,
                 event.body_as_json()))
    partition.update_checkpoint(event)  # after the event is handled
    last[0] = time.monotonic()


def on_claim(partition):
    claimed.add(partition.partition_id)
    last[0] = time.monotonic()


worker = threading.Thread(target=reader.receive, daemon=True, kwargs=dict(
    on_event=on_event, on_partition_initialize=on_claim, max_wait_time=1,
    starting_position='-1'))
worker.start()
# stop once it reads all four partitions and the hub has gone quiet
while len(claimed) < 4 or time.monotonic() - last[0] < 5:
    time.sleep(0.5)
reader.close()
for partition, number, body in sorted(seen, key=lambda s: s[:2]):
    print(f"partition {partition} #{number}  {body['key']} {body['event']}")
print(f"{len(seen)} read, checkpoint saved")
