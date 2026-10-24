"""October 2026 for risk-prod, by owner tag: a cost export's columns, with
HYPOTHETICAL prices (the course's rate card). A resource does not inherit
its resource group's tags, so whatever was made without them is untagged."""
import csv
from collections import defaultdict

BUDGET = 2500.00                      # budget risk-prod-monthly, USD
rows = list(csv.DictReader(open('cost/risk-prod-202610.csv')))
total = sum(float(r['usd']) for r in rows)

by_owner = defaultdict(float)
for r in rows:
    by_owner[r['owner'] or '(untagged)'] += float(r['usd'])
print(f'{"owner":14}{"USD":>10}{"share":>8}')
for owner, usd in sorted(by_owner.items(), key=lambda kv: -kv[1]):
    print(f'{owner:14}{usd:10,.2f}{usd / total:8.0%}')
print(f'{"total":14}{total:10,.2f}   '
      f'budget {BUDGET:,.0f}: {total / BUDGET:.0%}')

print('untagged:')
for r in rows:
    if not r['owner']:
        print(f"  {r['resource']:18}{r['service']:20}{float(r['usd']):8.2f}")
