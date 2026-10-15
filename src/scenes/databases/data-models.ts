import type { Scene } from '@graphlearning/flow'

// Ch7 §1 — choose a data model from the access pattern and the correctness requirement, not from
// fashion. The retail examples are illustrative, not prescriptions.
export const dataModels: Scene = {
  id: 'data-models',
  title: 'Matching data to its shape',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'models',
      kind: 'table',
      label: 'Four models, one shop',
      headers: ['Model', 'Strong at', 'Shop example'],
      values: [
        ['Relational', 'joins, transactions', 'orders and stock'],
        ['Document', 'one item, one read', 'product catalogue'],
        ['Key-value cache', 'speed for hot reads', 'prices, sessions'],
        ['Object', 'large files', 'product images'],
      ],
    },
    {
      id: 'ask',
      label: 'Ask before choosing',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'queries', label: 'What are the queries?', sub: 'lookups, joins, scans', pattern: 'service', icon: 'search' },
        { id: 'atomic', label: 'What must be atomic?', sub: 'money, stock', pattern: 'warn', icon: 'lock' },
        { id: 'scale', label: 'How fast and how big?', sub: 'latency, growth', pattern: 'network', icon: 'gauge' },
        { id: 'owner', label: 'Who owns the data?', sub: 'one service, one owner', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'models', target: 'ask', label: 'decide by' }],
}
