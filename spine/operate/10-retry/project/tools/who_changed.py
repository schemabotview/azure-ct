"""Who changed nsg-snet-pe, from an export of the subscription's Activity
Log (data/activity_20261016.json: EXAMPLE records, invented values). Reads
are not changes; a change made with privilege shows the activation before."""
import json
import sys

SHORT = {'roleDefinitionId': 'role', 'principalName': 'to',
         'sourceAddressPrefix': 'from', 'destinationPortRange': 'port'}
target = sys.argv[1] if len(sys.argv) > 1 else 'nsg-snet-pe'
records = json.load(open('data/activity_20261016.json'))['value']
for r in sorted(records, key=lambda r: r['eventTimestamp']):
    op = r['operationName']['value']
    if op.endswith('/read'):
        continue
    when = r['eventTimestamp'].replace('T', ' ')[5:16]
    what = op.split('/')[-2] + ' ' + op.split('/')[-1]
    where = r['resourceId'].split('/providers/')[-1].split('/', 2)[-1]
    if target in r['resourceId'] or 'roleAssignments' in op:
        body = json.loads(r['properties'].get('requestbody', '{}'))
        print(f"{when}  {r['caller']:29}{what}")
        if 'roleAssignments' not in op:
            print(f"{'':12}{where}, from {r['claims']['ipaddr']}")
        if body:
            print(f"{'':12}" + ' '.join(f'{SHORT.get(k, k)}={v}' for k, v in
                                        body['properties'].items()))
