import type { Scene } from '@graphlearning/flow'

// Ch7 §7 — five consistency levels trade latency and availability for stronger read guarantees.
// Transactions are scoped to one logical partition. Session is the default level.
export const cosmosConsistency: Scene = {
  id: 'ch07-cosmos-consistency',
  title: 'Consistency, concurrency and transaction scope',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'levels',
      kind: 'table',
      label: 'Five consistency levels',
      headers: ['Level', 'A read can see', 'Cost'],
      values: [
        ['Strong', 'the latest write', 'highest latency'],
        ['Bounded staleness', 'writes within a bound', 'high'],
        ['Session', 'your own writes', 'low (default)'],
        ['Consistent prefix', 'writes in order', 'low'],
        ['Eventual', 'any older state', 'lowest'],
      ],
    },
    {
      id: 'scope',
      label: 'What is atomic, and what is checked',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'batch', label: 'Transactional batch', sub: 'one logical partition only', pattern: 'service', icon: 'lock' },
        { id: 'etag', label: 'ETag check', sub: 'optimistic concurrency', pattern: 'network', icon: 'hash' },
        { id: 'multi', label: 'Multi-region writes', sub: 'conflicts need a policy', pattern: 'warn', icon: 'globe' },
      ],
    },
  ],
  edges: [{ source: 'levels', target: 'scope', label: 'plus' }],
}
