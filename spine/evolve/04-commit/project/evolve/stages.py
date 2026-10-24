"""Where the overnight run's time goes: 30 nights of stage durations in
minutes (data/night_runs_202609.csv, as the factory's and Databricks' run
history would give them; the numbers are a model's). The median says what
a night usually costs; the 95th percentile says what makes a night late."""
import csv
import statistics

rows = list(csv.DictReader(open('data/night_runs_202609.csv')))
stages = [s for s in rows[0] if s != 'night']
nights = {s: sorted(float(r[s]) for r in rows) for s in stages}
total = sorted(sum(float(r[s]) for s in stages) for r in rows)


def p95(values):
    return statistics.quantiles(values, n=20)[-1]


print(f'{"stage":16}{"median":>8}{"p95":>8}{"worst":>8}  '
      'share of a usual night')
usual = statistics.median(total)
for s in stages + ['whole night']:
    v = total if s == 'whole night' else nights[s]
    share = statistics.median(v) / usual
    bar = '' if s == 'whole night' else '#' * round(share * 40)
    line = f'{s:16}{statistics.median(v):8.1f}{p95(v):8.1f}{max(v):8.1f}  {bar}'
    print(line.rstrip())
spread = {s: p95(v) - statistics.median(v) for s, v in nights.items()}
longest = max(stages, key=lambda s: statistics.median(nights[s]))
print(f'longest stage: {longest}; widest spread: {max(spread, key=spread.get)}')
