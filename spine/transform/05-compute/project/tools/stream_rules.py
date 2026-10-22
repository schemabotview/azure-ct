"""Three things a stream reader must expect, as a model (plain Python, no
emulator): throttling, late events and duplicates."""
import math

# 1. Throttling. A Standard throughput unit takes in up to 1,000 events/s.
# At the 08:00 open, rates arrive at 2,600 events/s for 5 s: 13,000 events.
print('the 08:00 burst, 13,000 events')
for units in (2, 3):
    refused = max(0, 2600 - units * 1000)  # a second, retried by the sender
    done = math.ceil(13000 / min(2600, units * 1000))
    print(f'  {units} units: {refused:4} refused a second, all in by {done} s')

# 2. Late events. Rates are counted in the minute they happened (event
# time), and a minute stays open 10 s after it ends for late arrivals.
print('the 14:00 minute, open until 14:01:10')
for pair, happened, arrived in [('GBPUSD', '14:00:58', '14:00:59'),
                                ('EURUSD', '14:00:58', '14:01:07'),
                                ('SGDUSD', '14:00:59', '14:01:24')]:
    verdict = 'counted' if arrived <= '14:01:10' else 'too late: a correction'
    print(f'  {pair} at {happened}, arrived {arrived}: {verdict}')

# 3. Duplicates. A sender that retries can deliver an event twice; the
# reader keeps the first of each event id.
events = ['LC-2041/booked', 'LC-2041/issued', 'LC-2041/issued',
          'LC-2042/booked']
kept = list(dict.fromkeys(events))
print(f'deal events: {len(events)} received, {len(kept)} kept, '
      f'{len(events) - len(kept)} duplicate dropped')
