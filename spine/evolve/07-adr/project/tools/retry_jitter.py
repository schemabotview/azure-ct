"""A model, not Azure: 400 dashboards open at 08:00:00 and each looks up
its group in Cosmos DB once. Say the container's RU/s admit 40 lookups per
100 ms; the rest are answered 429 (too many requests). How long until
everyone is served, for each way of retrying?"""
import random

CALLERS, ADMIT, WINDOW = 400, 40, 0.1          # 40 per 100 ms
random.seed(12)


def fixed(n):
    return 1.0                              # wait 1 s every time


def exponential(n):
    return min(0.1 * 2 ** n, 6.4)           # 0.1, 0.2, 0.4 ... 6.4 s


def full_jitter(n):
    return random.uniform(0, exponential(n))


def serve(wait):
    queue = [(0.0, c, 0) for c in range(CALLERS)]   # (time, caller, tries)
    served, refused, last = 0, 0, 0.0
    while queue:
        queue.sort()
        start = queue[0][0]                  # the next 100 ms window
        now = [q for q in queue if q[0] < start + WINDOW]
        queue = queue[len(now):]
        for i, (t, caller, tries) in enumerate(now):
            if i < ADMIT:
                served, last = served + 1, t
            else:
                refused += 1
                queue.append((t + wait(tries), caller, tries + 1))
    return refused, last


print(f'{"retry policy":34}{"429s":>7}{"last served":>13}')
for name, wait in (('fixed 1 s', fixed),
                   ('exponential, no jitter', exponential),
                   ('exponential with full jitter', full_jitter)):
    refused, last = serve(wait)
    print(f'{name:34}{refused:7,}{last:12.1f}s')
