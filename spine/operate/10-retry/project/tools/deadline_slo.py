"""The 07:00 report as a service objective, a model over September 2026:
when the large exposures file was filed each business day (06:34 when all
goes well). Objective: filed by 07:00 on 95% of business days, so about one
late day a month is the error budget."""
from datetime import date, timedelta

LATE = {date(2026, 9, 17): '07:20',   # TradeBook copy timed out twice
        date(2026, 9, 29): '06:58'}   # nightly reran after a 04:00 page
days = [date(2026, 9, 1) + timedelta(d) for d in range(30)]
business = [d for d in days if d.weekday() < 5]
filed = {d: LATE.get(d, '06:34') for d in business}

met = [d for d, t in filed.items() if t <= '07:00']
budget = round(len(business) * (1 - 0.95), 1)
missed = len(business) - len(met)
print(f'{len(business)} business days, filed by 07:00 on {len(met)} '
      f'({len(met) / len(business):.1%}): objective 95%')
left = f'{budget - missed:.1f} left' if missed <= budget else 'spent'
print(f'error budget {budget} days, used {missed}, {left}')
for d, t in filed.items():
    if t != '06:34':
        print(f"  {d:%a %d %b}  filed {t}{'  LATE' if t > '07:00' else ''}")
