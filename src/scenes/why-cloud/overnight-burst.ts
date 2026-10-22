import type { Scene } from '@graphlearning/flow'

// Renting against owning, on the platform's fixed day: the overnight exposure run needs 16 workers
// from 00:00 to 02:00, the intraday refresh 2 workers from 08:00 to 18:00, nothing otherwise.
// Owned for the peak: 16 × 24 = 384 worker-hours a day; used: 16 × 2 + 2 × 10 = 52 (14% busy).
// At the HYPOTHETICAL rate of USD 0.20 per worker-hour: 52 × 0.20 = 10.40 rented, 384 × 0.20 = 76.80
// for the same capacity held all day.
export const overnightBurst: Scene = {
  id: 'overnight-burst',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'day-side',
      label: 'The platform’s day',
      bare: true,
      children: [
        {
          id: 'day',
          kind: 'plot',
          label: 'Workers needed over a day',
          plot: {
            x: { min: 0, max: 24, step: 4, label: 'hour of day (London)' },
            y: { min: 0, max: 20, step: 4, label: 'workers' },
            series: [
              { kind: 'area', points: [[0, 16], [2, 16], [2, 0], [8, 0], [8, 2], [18, 2], [18, 0], [24, 0]], label: 'needed', labelAt: [2.6, 13], color: 'user' },
              { kind: 'segment', from: [0, 16], to: [24, 16], label: 'owned for the peak: 16', labelAt: [13, 17.4], color: 'service' },
            ],
          },
        },
        {
          id: 'phases',
          kind: 'table',
          label: 'What the work is',
          headers: ['hours', 'work', 'workers'],
          values: [
            ['00–02', 'overnight exposure run, every group', '16'],
            ['08–18', 'intraday refresh as prices move', '2'],
            ['otherwise', 'nothing to compute', '0'],
          ],
        },
      ],
    },
    {
      id: 'compare-side',
      label: 'Two ways to pay',
      bare: true,
      children: [
        {
          id: 'own',
          kind: 'table',
          label: 'Own 16 machines',
          headers: ['', 'per day'],
          values: [
            ['capacity held', '384 worker-hours'],
            ['capacity used', '52 worker-hours'],
            ['busy', '14%'],
            ['at USD 0.20 an hour', '76.80'],
          ],
        },
        {
          id: 'rent',
          kind: 'table',
          label: 'Rent what each hour needs',
          headers: ['', 'per day'],
          values: [
            ['capacity paid for', '52 worker-hours'],
            ['at USD 0.20 an hour', '10.40'],
            ['the rate', 'hypothetical, for comparison'],
          ],
        },
        {
          id: 'changes',
          kind: 'list',
          icon: 'clock',
          label: 'What renting changes',
          pattern: 'storage',
          items: [
            'Capacity arrives in minutes, not months',
            'Stopped capacity stops costing (mostly — Course 2)',
            'The night can use 16 workers and the day 2',
            'The ceiling is a quota you can raise, not a purchase',
          ],
        },
      ],
    },
  ],
  edges: [],
}
