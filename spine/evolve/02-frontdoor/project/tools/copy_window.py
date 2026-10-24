"""Run copy_tradebook's Copy activity by hand, for one window: its own query
from adf/pipeline/copy_tradebook.json, against TradeBook (a local PostgreSQL
16 stand-in), into bronze (the emulator) as Parquet, where it would land.

    python tools/copy_window.py 2026-10-13 2026-10-14
"""
import io
import json
import os
import re
import sys

import psycopg
import pyarrow as pa
import pyarrow.parquet as pq
from azure.storage.blob import BlobServiceClient

start, end = sys.argv[1], sys.argv[2]
pipeline = json.load(open('adf/pipeline/copy_tradebook.json'))
copy = pipeline['properties']['activities'][0]['typeProperties']
params = {'windowStart': start, 'windowEnd': end}
query = re.sub(r"@\{pipeline\(\)\.parameters\.(\w+)\}",
               lambda m: params[m.group(1)], copy['source']['query'])
print(query.replace(' FROM', '\n  FROM').replace(' WHERE', '\n WHERE'))

with psycopg.connect(dbname='tradebook') as db:
    cursor = db.execute(query)
    names = [c.name for c in cursor.description]
    rows = cursor.fetchall()
table = pa.table({n: [r[i] for r in rows] for i, n in enumerate(names)})

buffer = io.BytesIO()
pq.write_table(table, buffer)
path = f'tradebook/deals/{start}/deals.parquet'  # the dataset's folder + file
BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING']).get_blob_client(
    'bronze', path).upload_blob(buffer.getvalue(), overwrite=True)
print(f'{len(rows)} rows -> bronze/{path}')
