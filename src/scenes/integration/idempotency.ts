import type { Scene } from '@graphlearning/flow'

// Ch8 §9 — at-least-once delivery means duplicates happen; the business effect must be made
// idempotent by the consumer. A unique key in the database is the reliable mechanism. Messages that
// keep failing are parked, and a slow consumer must be able to push back.
export const idempotency: Scene = {
  id: 'idempotency',
  title: 'Duplicates, poison messages and pressure',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'guard',
      kind: 'code',
      filename: 'fulfilment (idempotent)',
      label: `-- fulfilments.order_id is PRIMARY KEY
INSERT INTO fulfilments (order_id) VALUES (1042);
-- a duplicate delivery hits a key violation:
-- skip shipping, acknowledge the message`,
    },
    {
      id: 'timeline',
      kind: 'table',
      label: 'A duplicate fulfilment, prevented',
      headers: ['Delivery', 'Insert key 1042', 'Ships?'],
      values: [
        ['first', 'succeeds', 'yes'],
        ['second (duplicate)', 'key violation', 'no'],
      ],
    },
    {
      id: 'safety',
      label: 'Keeping a pipeline healthy',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'retry', label: 'Retry with backoff', sub: 'for transient faults', pattern: 'service', icon: 'repeat' },
        { id: 'poison', label: 'Poison messages', sub: 'park after N tries', pattern: 'warn', icon: 'ban' },
        { id: 'pressure', label: 'Backpressure', sub: 'slow the producer', pattern: 'network', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'guard', target: 'timeline', label: 'effect' },
    { source: 'timeline', target: 'safety', label: 'plus' },
  ],
}
