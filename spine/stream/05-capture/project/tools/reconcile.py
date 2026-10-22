"""Reconcile the lake with TradeBook: count the deals and sum their amounts on
both sides. The lake's view is bronze's daily windows, each deal at its latest
version. A difference is listed deal by deal, never averaged away."""
import io
import os

import psycopg
import pyarrow.parquet as pq
from azure.storage.blob import BlobServiceClient

with psycopg.connect(dbname='tradebook') as db:
    source = dict(db.execute('SELECT deal_id, amount_musd FROM trade.deals'))

lake_account = BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'])
bronze = lake_account.get_container_client('bronze')
latest = {}
for blob in bronze.list_blobs(name_starts_with='tradebook/deals/'):
    data = bronze.download_blob(blob.name).readall()
    for row in pq.read_table(io.BytesIO(data)).to_pylist():
        if row['deal_id'] not in latest or \
                row['updated_at'] > latest[row['deal_id']]['updated_at']:
            latest[row['deal_id']] = row
lake = {d: r['amount_musd'] for d, r in latest.items()}

print(f"{'':10}{'deals':>6}{'USD m':>9}")
for side, deals in (('TradeBook', source), ('lake', lake)):
    print(f'{side:10}{len(deals):6}{sum(deals.values()):9.2f}')
for deal in sorted(source.keys() | lake.keys()):
    if source.get(deal) != lake.get(deal):
        print(f"  {deal}: TradeBook {source.get(deal, 'absent')},"
              f" lake {lake.get(deal, 'absent')}")
