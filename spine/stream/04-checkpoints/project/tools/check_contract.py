"""Check a delivered file against the contract its source agreed to: the
columns, in order, and every value against its column's pattern. A file that
breaks it is refused whole, never half loaded. The contract is named by the
file: hierarchy_20261014.csv is checked against contracts/hierarchy.json.

    python tools/check_contract.py data/<file>.csv
"""
import csv
import json
import re
import sys

path = sys.argv[1]
name = path.rpartition('/')[2]
contract = json.load(open(f"contracts/{name.split('_')[0]}.json"))
agreed = [c['name'] for c in contract['columns']]
rows = list(csv.DictReader(open(path, newline='')))
header = list(rows[0]) if rows else []
problems = []

if header != agreed:
    if missing := [c for c in agreed if c not in header]:
        problems.append('missing column ' + ', '.join(missing))
    if extra := [c for c in header if c not in agreed]:
        problems.append('unexpected column ' + ', '.join(extra))
for column in contract['columns']:
    if column['name'] in header:
        bad = [r[column['name']] for r in rows
               if not re.match(column['pattern'], r[column['name']])]
        if bad:
            problems.append(f"{column['name']}: {len(bad)} of {len(rows)} rows "
                            f"break {column['pattern']}, e.g. {bad[0]}")
keys = [r.get(contract['key']) for r in rows]
if contract['key'] in header and len(set(keys)) != len(keys):
    problems.append(f"{contract['key']} is not unique")

print(f'{name}: ' + ('refused' if problems else
                     f'agreed: {len(agreed)} columns, {len(rows)} rows'))
for p in problems:
    print('  ' + p)
sys.exit(1 if problems else 0)
