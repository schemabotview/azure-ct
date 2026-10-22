"""The bank's market-data producer, unchanged since it was written for the
bank's own Kafka cluster: it publishes each FX rate to the fx-rates topic,
keyed by currency pair. Where it connects is entirely its configuration.

    python feeds/market_producer.py feeds/<cluster>.properties
"""
import csv
import json
import sys

from confluent_kafka import Producer

config = dict(line.strip().split('=', 1) for line in open(sys.argv[1])
              if line.strip() and not line.startswith('#'))
producer = Producer(config)


receipts = []


def delivered(error, message):  # Kafka reports each delivery, in any order
    receipts.append((message.partition(), message.offset(),
                     message.key().decode(), error))


for row in csv.DictReader(open('data/fx_20261013.csv')):
    producer.produce('fx-rates', key=row['pair'], value=json.dumps(row),
                     on_delivery=delivered)
producer.flush(30)
for partition, offset, key, error in sorted(receipts):
    print(f'{key:7} {error or f"partition {partition}, offset {offset}"}')
