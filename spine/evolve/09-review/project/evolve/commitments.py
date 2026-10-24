"""Rightsize first, then commit: three always-on parts of risk-prod, at the
course's HYPOTHETICAL rates. A commitment pays only for hours that would
have run anyway, so idle hours are removed before any are reserved."""
HOURS = 730                                   # a month
RATE = {'vm': 0.20, 'postgres': 0.25, 'app': 0.20}       # USD per hour
RESERVED, SAVINGS_PLAN = 0.35, 0.25           # 1-year discounts (assumed)

parts = [
    # name, rate, instances, hours a day needed, fix
    ('runtime VMs', 'vm', 2, 9, 'stop 02:30-17:30'),
    ('risk mart + standby', 'postgres', 2, 24, 'reserve 1 year'),
    ('API plan, 3 zones', 'app', 3, 24, 'savings plan'),
]
print(f'{"part":22}{"now":>9}{"after":>9}  how')
before = after = 0.0
for name, kind, count, needed, fix in parts:
    now = RATE[kind] * count * HOURS
    if needed < 24:                           # idle: schedule it off
        new = now * needed / 24
    else:                                     # steady: commit to it
        new = now * (1 - (RESERVED if 'reserve' in fix else SAVINGS_PLAN))
    before, after = before + now, after + new
    print(f'{name:22}{now:9.2f}{new:9.2f}  {fix}')
print(f'{"total":22}{before:9.2f}{after:9.2f}  USD a month, hypothetical')
print(f'a 1-year reservation beats pay-as-you-go above '
      f'{1 - RESERVED:.0%} of hours in use')
