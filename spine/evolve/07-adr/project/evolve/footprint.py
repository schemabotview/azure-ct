"""Less compute, less data kept: three changes, measured in PROXIES (vCPU-
hours a month, GB kept, GB read from the origin). These are not carbon
figures; the Emissions Impact Dashboard reports those per subscription."""
changes = [
    # proxy, before, after, the change
    ('runtime vCPU-hours', 2 * 4 * 730, 2 * 4 * 730 * 9 / 24,
     'runtime VMs off 15 h a day'),
    ('log GB searchable', 1 * 90, 1 * 30,
     'interactive 90 -> 30 days, then archive'),
    ('report GB from origin', 40.0, 40.0 * 0.1,
     'Front Door serves 90% of reads'),
]
print(f'{"proxy":24}{"before":>9}{"after":>9}  change')
for proxy, before, after, change in changes:
    print(f'{proxy:24}{before:9,.0f}{after:9,.0f}  {change}')
print("kept as is: 2,557 days of reports (the bank's rule) and the"
      ' standby (the RTO)')
