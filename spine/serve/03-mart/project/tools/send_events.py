"""Send a few events to each hub and show where each one landed. Events with
the same partition key always go to the same partition, so they stay in the
order they were sent; across partitions there is no order."""
import json
import os

from azure.eventhub import EventData, EventHubProducerClient

SENDS = {
    'fx-rates': [('GBPUSD', {'rate': 1.2731}), ('EURUSD', {'rate': 1.0842}),
                 ('SGDUSD', {'rate': 0.7712}), ('GBPUSD', {'rate': 1.2735})],
    'deal-events': [('LC-2041', {'event': 'booked', 'amount_musd': 2.00}),
                    ('LC-1995', {'event': 'amended', 'amount_musd': 1.50}),
                    ('LC-2041', {'event': 'issued'})],
}

for hub, events in SENDS.items():
    producer = EventHubProducerClient.from_connection_string(
        os.environ['EVENTHUBS_CONNECTION_STRING'], eventhub_name=hub)
    with producer:
        ids = producer.get_partition_ids()
        print(f'{hub}: {len(ids)} partitions')

        def last():
            return {p: producer.get_partition_properties(p)[
                'last_enqueued_sequence_number'] for p in ids}
        for key, body in events:
            before = last()
            batch = producer.create_batch(partition_key=key)
            batch.add(EventData(json.dumps({'key': key, **body})))
            producer.send_batch(batch)
            after = last()
            landed = next(p for p in ids if after[p] != before[p])
            print(f'  {key:8} -> partition {landed}, number {after[landed]}')
