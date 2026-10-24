"""The API's lookup by group, in Cosmos DB (the emulator): one item per
counterparty and one per group, all partitioned by /groupId, so everything
about a group lives in one logical partition."""
import csv
import os

from azure.cosmos import CosmosClient, PartitionKey

client = CosmosClient(os.environ['COSMOS_ENDPOINT'], os.environ['COSMOS_KEY'])
db = client.create_database_if_not_exists('risk')
groups = db.create_container_if_not_exists(
    'groups', partition_key=PartitionKey(path='/groupId'))

rows = list(csv.DictReader(open('data/hierarchy_20261013.csv')))
for r in rows:
    groups.upsert_item({'id': r['counterparty_id'], 'groupId': r['group_id'],
                        'name': r['counterparty_name']})
for g in {r['group_id']: r['group_name'] for r in rows}.items():
    groups.upsert_item({'id': g[0], 'groupId': g[0], 'name': g[1],
                        'type': 'group'})
print(f'{len(rows)} counterparties, 5 groups loaded')

item = groups.read_item('G-WW', partition_key='G-WW')   # id + key: one read
print(f"point read  {item['name']}")
members = groups.query_items(                           # one partition
    "SELECT c.id FROM c WHERE c.groupId = 'G-WW' AND NOT IS_DEFINED(c.type)",
    partition_key='G-WW')
print('one group   ' + ', '.join(m['id'] for m in members))
found = groups.query_items(                             # every partition
    "SELECT c.groupId FROM c WHERE c.id = 'C-502'",
    enable_cross_partition_query=True)
print(f"by id only  C-502 is in {next(iter(found))['groupId']}, after asking"
      ' every partition')
