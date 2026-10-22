"""A cache in front of the mart's headroom, as a model (plain Python): the
dashboard asks often, the mart answers slowly. At 10 s a dealer reserves 1.00
of Wide World's 1.60. What does the dashboard show, and when?"""
TTL = 60
mart = {'G-WW': 1.60}


def timeline(invalidate):
    cache, shown = {}, []
    for t in range(0, 70, 10):
        if t == 10:                       # the reservation commits in the mart
            mart['G-WW'] = 0.60
            if invalidate:
                cache.pop('G-WW', None)   # the writer deletes the cached copy
        if 'G-WW' not in cache or t - cache['G-WW'][1] >= TTL:
            cache['G-WW'] = (mart['G-WW'], t)  # a miss: read the mart
        shown.append(f'{cache["G-WW"][0]:.2f}')
    mart['G-WW'] = 1.60
    return ' '.join(shown)


print('seconds              0    10   20   30   40   50   60')
print(f'expire after 60 s    {timeline(invalidate=False)}')
print(f'and delete on write  {timeline(invalidate=True)}')
