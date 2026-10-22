import type { Scene } from '@graphlearning/flow'

// Azure's relational options: Azure SQL Database (managed SQL Server engine, single database or
// elastic pool, serverless option), SQL Managed Instance (near-complete SQL Server instance
// compatibility: SQL Agent, cross-database queries), SQL Server on a VM (the full product, the
// customer patches and backs up), Azure Database for PostgreSQL flexible server (managed community
// PostgreSQL, zone-redundant HA, backups and point-in-time restore, extensions).
// source: https://learn.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview
export const relational: Scene = {
  id: 'relational-choices',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Four ways to run a relational database on Azure',
      headers: ['', 'Azure SQL Database', 'SQL Managed Instance', 'SQL Server on a VM', 'PostgreSQL flexible server'],
      values: [
        ['engine', 'SQL Server', 'SQL Server', 'SQL Server', 'PostgreSQL'],
        ['you manage', 'the data', 'the data', 'OS, patches, backups', 'the data'],
        ['fits', 'new apps', 'moving a whole instance', 'what needs the OS', 'new apps, open source'],
        ['high availability', 'built in, zones', 'built in, zones', 'you build it', 'zone-redundant standby'],
        ['restore', 'to a point in time', 'to a point in time', 'your backups', 'to a point in time'],
      ],
    },
    {
      id: 'choice-row',
      label: 'The mart’s choice',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'why-pg',
          kind: 'table',
          label: 'Why PostgreSQL flexible server',
          headers: ['reason', 'weight'],
          values: [
            ['TradeBook is PostgreSQL: one skill set', 'high'],
            ['SERIALIZABLE for reservations', 'high'],
            ['zone-redundant standby, PITR', 'high'],
            ['no SQL Agent or instance features needed', 'rules out MI'],
            ['no OS to run', 'rules out a VM'],
          ],
        },
        {
          id: 'not-chosen',
          kind: 'list',
          icon: 'circleslash',
          label: 'What would change the answer',
          pattern: 'warn',
          items: [
            'An existing SQL Server estate: Azure SQL',
            'A vendor product that needs SQL Agent: MI',
            'A product that needs the OS: a VM',
          ],
        },
      ],
    },
  ],
  edges: [],
}
