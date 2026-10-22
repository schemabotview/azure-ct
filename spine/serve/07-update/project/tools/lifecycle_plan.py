"""The lake after a year: where the lifecycle rules have put bronze, and the
month's storage bill. A model, with HYPOTHETICAL prices; reading from cool
and cold costs more per GB, which this leaves out.

Bronze grows by 2 GB a day; landing holds the last 30 days of deliveries.
"""
PRICE = {'hot': 0.020, 'cool': 0.010, 'cold': 0.004}  # USD per GB-month
DAILY_GB = 2


def tier(age_days):  # templates/modules/lifecycle.bicep, bronze-cools-with-age
    return 'cold' if age_days > 90 else 'cool' if age_days > 30 else 'hot'


gb = {'hot': 0, 'cool': 0, 'cold': 0}
for age in range(365):           # one partition per day, newest first
    gb[tier(age)] += DAILY_GB
landing_gb = 30 * DAILY_GB       # landing-kept-30-days: older copies deleted

print(f"{'bronze':10}{'GB':>6}{'USD/month':>11}")
for name, size in gb.items():
    print(f'  {name:8}{size:6}{size * PRICE[name]:11.2f}')
tiered = sum(size * PRICE[name] for name, size in gb.items())
all_hot = sum(gb.values()) * PRICE['hot']
print(f"{'tiered':10}{sum(gb.values()):6}{tiered:11.2f}")
print(f"{'all hot':10}{sum(gb.values()):6}{all_hot:11.2f}")
print(f"{'landing':10}{landing_gb:6}{landing_gb * PRICE['hot']:11.2f}",
      ' hot, 30 days')
