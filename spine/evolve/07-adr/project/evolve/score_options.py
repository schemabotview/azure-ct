"""ADR-001's options against its musts and wants. A must is a filter, not
a score: an option that fails one is out, however well it does elsewhere.
The scores are the team's judgement, written down so they can be argued."""
WEIGHTS = {'W1 team runs it': 3, 'W2 cost': 2, 'W3 open source': 1}
options = {
    'PostgreSQL flexible': {'fails': None, 'wants': [5, 4, 5]},
    'Azure SQL Database': {'fails': None, 'wants': [2, 3, 1]},
    'Cosmos DB alone': {'fails': 'M1 transaction', 'wants': [3, 3, 1]},
    'Databricks SQL': {'fails': 'M4 lookup < 100 ms', 'wants': [4, 2, 4]},
}
best = 5 * sum(WEIGHTS.values())
results = []
for name, o in options.items():
    score = sum(w * s for w, s in zip(WEIGHTS.values(), o['wants']))
    results.append((o['fails'] is None, score, name, o['fails']))
for passes, score, name, fails in sorted(results, reverse=True):
    verdict = f'{score} of {best}' if passes else f'out: fails {fails}'
    print(f'{name:22}{verdict}')
