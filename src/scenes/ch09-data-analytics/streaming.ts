import type { Scene } from '@graphlearning/flow'

// Ch9 §6 — event time versus processing time, tumbling windows, and what happens to a late event.
// Query syntax follows Azure Stream Analytics. Window and lateness values are illustrative.
export const streaming: Scene = {
  id: 'ch09-streaming',
  title: 'A late event meets a window',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'Stream Analytics query',
      label: `SELECT System.Timestamp() AS window_end,
       sku, COUNT(*) AS orders
FROM orders TIMESTAMP BY order_time
GROUP BY sku, TumblingWindow(minute, 5)`,
    },
    {
      id: 'late',
      kind: 'table',
      label: 'An order made at 10:04 arrives at 10:07',
      headers: ['Policy', 'Window 10:00 to 10:05', 'Freshness'],
      values: [
        ['No lateness allowed', 'event dropped or adjusted', 'result at 10:05'],
        ['Allow 3 minutes late', 'event counted', 'result waits to 10:08'],
      ],
    },
    {
      id: 'tradeoff',
      label: 'The trade-offs',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'fresh', label: 'Freshness', sub: 'waiting delays results', pattern: 'warn', icon: 'clock' },
        { id: 'dupes', label: 'Duplicates', sub: 'replays count twice', pattern: 'network', icon: 'copy' },
        { id: 'cost', label: 'Cost', sub: 'always-on compute', pattern: 'storage', icon: 'cost' },
      ],
    },
  ],
  edges: [
    { source: 'query', target: 'late', label: 'a late event' },
    { source: 'late', target: 'tradeoff', label: 'balances' },
  ],
}
