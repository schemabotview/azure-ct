"""The Well-Architected review's findings, each with the evidence a course
produced, ranked by value over effort (both 1-5, the team's judgement)."""
findings = [
    # pillar, finding, value, effort
    ('Reliability', 'lake has no copy outside UK South', 5, 2),
    ('Reliability', 'restore drill timed but not scheduled', 4, 1),
    ('Operations', 'three resources untagged, no owner', 3, 1),
    ('Security', 'drop tokens by hand, pasted in tickets', 4, 3),
    ('Cost', 'runtime VMs idle 15 h a day', 4, 1),
    ('Cost', 'mart and API plan not committed', 3, 1),
    ('Operations', 'one alert: the night; none on the API', 4, 2),
    ('Performance', 'TradeBook copy p95 four times its median', 3, 3),
    ('Performance', 'silver stage is a third of the night', 2, 4),
]
ranked = sorted(findings, key=lambda f: f[2] / f[3], reverse=True)
print(f'{"#":>2}  {"pillar":12}{"value/effort":>13}  finding')
for n, (pillar, finding, value, effort) in enumerate(ranked, 1):
    print(f'{n:>2}  {pillar:12}{value:>7}/{effort:<5}  {finding}')
