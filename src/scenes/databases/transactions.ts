import type { Scene } from '@graphlearning/flow'

// Ch7 §4 — one order as one atomic transaction, and a hypothetical connection-exhaustion trace.
// The numbers in the trace are illustrative, not a tier's real limits.
export const transactions: Scene = {
  id: 'transactions',
  title: 'One order, one transaction',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'sql',
      kind: 'code',
      filename: 'place_order.sql',
      label: `BEGIN TRANSACTION;
INSERT INTO orders (order_id, customer_id, total)
  VALUES (1042, 7, 36.00);
INSERT INTO order_items (order_id, sku, qty)
  VALUES (1042, 'BTL-01', 2);
UPDATE stock SET qty = qty - 2
  WHERE sku = 'BTL-01' AND qty >= 2;
COMMIT;`,
    },
    {
      id: 'rows',
      kind: 'table',
      label: 'Expected after COMMIT',
      headers: ['Table', 'Change'],
      values: [
        ['orders', '+1 row (1042)'],
        ['order_items', '+1 row'],
        ['stock BTL-01', 'qty 18 to 16'],
      ],
    },
    {
      id: 'pool',
      kind: 'table',
      label: 'A hypothetical connection-exhaustion trace',
      headers: ['App instances', 'Pool each', 'Connections', 'Server limit'],
      values: [
        ['3', '20', '60', '200'],
        ['12', '20', '240', '200: refused'],
      ],
    },
  ],
  edges: [
    { source: 'sql', target: 'rows', label: 'all or nothing' },
    { source: 'rows', target: 'pool', label: 'and at scale' },
  ],
}
