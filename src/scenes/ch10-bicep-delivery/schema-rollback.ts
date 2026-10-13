import type { Scene } from '@graphlearning/flow'

// Ch10 §6 — expand and contract: schema changes are made additive first so old and new application
// versions both work, and only removed after the old version is gone. After the contract step an
// application rollback no longer restores the old behaviour.
export const schemaRollback: Scene = {
  id: 'ch10-schema-rollback',
  title: 'Expand, deploy, contract',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Renaming a column without an outage',
      headers: ['Step', 'App', 'Schema', 'Roll back app?'],
      values: [
        ['1 Expand', 'v12 running', 'add new column', 'yes'],
        ['2 Release', 'v13 uses both', 'new column filled', 'yes'],
        ['3 Verify', 'v13 only', 'old column unused', 'yes'],
        ['4 Contract', 'v13 only', 'drop old column', 'no'],
      ],
    },
    {
      id: 'slot',
      label: 'Releasing the app part',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'warm', label: 'Warm the slot', sub: 'staging first', pattern: 'service', icon: 'power' },
        { id: 'canary', label: 'Canary traffic', sub: 'a small percentage', pattern: 'warn', icon: 'gauge' },
        { id: 'swap', label: 'Swap or revert', sub: 'code only', pattern: 'network', icon: 'repeat' },
      ],
    },
    { id: 'state', label: 'The database', sub: 'does not roll back with the app', pattern: 'storage', icon: 'database' },
  ],
  edges: [
    { source: 'steps', target: 'slot', label: 'app releases use' },
    { source: 'slot', target: 'state', label: 'but' },
  ],
}
