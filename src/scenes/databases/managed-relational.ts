import type { Scene } from '@graphlearning/flow'

// Ch7 §3 — PostgreSQL is a first-class managed option; selection is driven by the application's
// engine, extensions and ecosystem. "Flexible server" is the current PostgreSQL offering; confirm.
export const managedRelational: Scene = {
  id: 'managed-relational',
  title: 'Choosing a managed relational service',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'choose',
      kind: 'table',
      label: 'If the application needs...',
      headers: ['Need', 'Look at'],
      values: [
        ['T-SQL and SQL Server features', 'Azure SQL'],
        ['PostgreSQL ecosystem and extensions', 'Azure Database for PostgreSQL'],
        ['MySQL compatibility', 'Azure Database for MySQL'],
        ['Instance-level SQL Server features', 'SQL Managed Instance'],
      ],
    },
    {
      id: 'same',
      label: 'Questions that apply to every one',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'versions', label: 'Version support', sub: 'and retirement dates', pattern: 'warn', icon: 'clock' },
        { id: 'ha', label: 'High availability', sub: 'zone or region options', pattern: 'service', icon: 'shieldcheck' },
        { id: 'backups', label: 'Backups', sub: 'retention and restore', pattern: 'storage', icon: 'recoveryvault' },
        { id: 'private', label: 'Private access', sub: 'endpoints, firewall', pattern: 'network', icon: 'privateendpoint' },
      ],
    },
  ],
  edges: [{ source: 'choose', target: 'same', label: 'then ask' }],
}
