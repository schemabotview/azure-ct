"""Which storage events start a pipeline: a model of the match Event Grid and
Data Factory make, read from the triggers in adf/trigger/. Event Grid sends a
BlobCreated event with a subject; a trigger's blob path filters it."""
import glob
import json

DAY = 'collateral/2026-10-13/collateral_20261013.csv'
EVENTS = [  # time, path (container/blobs/...), bytes
    ('18:00', 'landing/blobs/hierarchy/2026-10-13/hierarchy_20261013.csv', 507),
    ('18:58', 'landing/blobs/collateral_20261013.csv', 283),  # wrong folder
    ('19:00', 'landing/blobs/' + DAY, 283),
    ('19:01', 'landing/blobs/collateral/2026-10-14/collateral_20261014.csv', 0),
    ('00:05', 'bronze/blobs/tradebook/deals/2026-10-13/deals.parquet', 2048),
]
triggers = {}
for f in sorted(glob.glob('adf/trigger/*.json')):
    t = json.load(open(f))
    if t['properties']['type'] == 'BlobEventsTrigger':
        triggers[t['name']] = t['properties']['typeProperties']


def route(path, size):
    for name, p in triggers.items():
        if ('/' + path).startswith(p['blobPathBeginsWith']) \
                and path.endswith(p['blobPathEndsWith']):
            if size == 0 and p['ignoreEmptyBlobs']:
                return 'ignored: 0 bytes'
            folder = path.split('/blobs/')[1].rpartition('/')[0]
            return f'{name} -> load_landing_file({folder})'
    return 'no trigger'


for time, path, size in EVENTS:
    print(f'{time}  {path.rpartition("/")[2]}')
    print(f'       {route(path, size)}')
