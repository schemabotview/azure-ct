"""risk-dev's month on the course's HYPOTHETICAL rate card, in USD."""
HOURS = 730
RATE = {'vm': 0.20, 'disk GB': 0.10, 'IP': 0.005, 'TU': 0.03, 'lake GB': 0.02}
BUDGET = 150.00

# resource, meter, quantity in a month, its owner tag (None: untagged)
LINES = [
    ('vm-wg-shir-dev', 'vm', HOURS, 'priya'),
    ('vm-wg-shir-dev disk', 'disk GB', 128, 'priya'),
    ('pip-wg-shir-dev', 'IP', HOURS, 'priya'),
    ('evh-wg-risk-dev', 'TU', HOURS, None),
    ('stwgriskdev', 'lake GB', 200, 'priya'),
]

cost = {name: qty * RATE[meter] for name, meter, qty, _ in LINES}
for name, meter, qty, _ in LINES:
    print(f'{name:22}{qty:>5} {meter:8}{cost[name]:>9.2f}')
running = sum(cost.values())
print(f'{"running":36}{running:>9.2f}')
print(f'{"VM deallocated":36}{running - cost["vm-wg-shir-dev"]:>9.2f}')

owners = {}
for name, _, _, owner in LINES:
    key = owner or '(untagged)'
    owners[key] = owners.get(key, 0) + cost[name]
for owner, total in owners.items():
    print(f'owner {owner:30}{total:>9.2f}')
print(f'{"budget risk-dev-monthly":36}{BUDGET:>9.2f}')
print(f'forecast is {running / BUDGET:.0%} of it: an alert; nothing stops')
