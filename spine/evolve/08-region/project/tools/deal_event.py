"""Publish one deal event, as TradeBook's outbox does when a deal changes.

    python tools/deal_event.py LC-2042 booked 1.20
"""
import json
import os
import sys

from azure.eventhub import EventData, EventHubProducerClient

deal, event, *amount = sys.argv[1:]
body = {'key': deal, 'event': event}
if amount:
    body['amount_musd'] = float(amount[0])
with EventHubProducerClient.from_connection_string(
        os.environ['EVENTHUBS_CONNECTION_STRING'],
        eventhub_name='deal-events') as producer:
    batch = producer.create_batch(partition_key=deal)
    batch.add(EventData(json.dumps(body)))
    producer.send_batch(batch)
print(f'sent {deal} {event}')
