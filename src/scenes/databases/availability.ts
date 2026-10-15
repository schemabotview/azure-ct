import type { Scene } from '@graphlearning/flow'

// Ch7 §5 — high availability, read replicas and backups answer different questions. A replica is
// asynchronous, so a read right after a write can be stale. Retention figures vary by service and
// tier; none are quoted here.
export const availability: Scene = {
  id: 'availability',
  title: 'HA, replicas and backups are different tools',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'topology',
      label: 'Primary and a read replica',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'primary', label: 'Primary', sub: 'accepts writes', pattern: 'storage', icon: 'database' },
        { id: 'replica', label: 'Read replica', sub: 'asynchronous copy', pattern: 'network', icon: 'database' },
      ],
    },
    {
      id: 'lag',
      kind: 'table',
      label: 'A replica-lag case',
      headers: ['Time', 'Event', 'Reader sees'],
      values: [
        ['0.0 s', 'price set to 20 on primary', ''],
        ['0.4 s', 'shopper reads from replica', 'price 18 (stale)'],
        ['1.2 s', 'replica catches up', 'price 20'],
      ],
    },
    {
      id: 'tools',
      kind: 'table',
      label: 'Which tool for which question',
      headers: ['Tool', 'Answers'],
      values: [
        ['High availability', 'a node or zone fails'],
        ['Read replica', 'too many reads (may lag)'],
        ['Backup and restore', 'a bad change, deleted data'],
      ],
    },
  ],
  edges: [
    { source: 'topology', target: 'lag', label: 'creates' },
    { source: 'lag', target: 'tools', label: 'so choose by question' },
  ],
}
