"""Changing a group in Cosmos DB (the emulator) without losing an update:
an ETag makes a replace conditional, and a transactional batch changes
several items in ONE logical partition all together, or not at all."""
import os

from azure.core import MatchConditions
from azure.cosmos import CosmosClient, exceptions

client = CosmosClient(os.environ['COSMOS_ENDPOINT'], os.environ['COSMOS_KEY'])
groups = client.get_database_client('risk').get_container_client('groups')

# Two analysts open Wide World Group at the same time
a = groups.read_item('G-WW', partition_key='G-WW')
b = groups.read_item('G-WW', partition_key='G-WW')
for who, item, note in (('A', a, 'on watch'), ('B', b, 'limit review')):
    try:
        groups.replace_item('G-WW', {**item, 'note': note}, etag=item['_etag'],
                            match_condition=MatchConditions.IfNotModified)
        print(f'{who} saves note "{note}": ok')
    except exceptions.CosmosHttpResponseError as e:
        print(f'{who} saves note "{note}": {e.status_code}, changed since read')

# A new counterparty and the group's count, together
summary = groups.read_item('G-WW', partition_key='G-WW')
for new in ('C-103', 'C-101'):
    batch = [('create', ({'id': new, 'groupId': 'G-WW'},)),
             ('upsert', ({**summary, 'members': 3},))]
    try:
        groups.execute_item_batch(batch, partition_key='G-WW')
        print(f'batch: add {new}, members 3: both applied')
    except exceptions.CosmosBatchOperationError as e:
        print(f'batch: add {new}, members 3: {e.status_code}, neither applied')
print(f"members now {groups.read_item('G-WW', 'G-WW').get('members')}")
