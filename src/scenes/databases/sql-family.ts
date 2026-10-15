import type { Scene } from '@graphlearning/flow'

// Ch7 §2 — three ways to run SQL Server engines on Azure, ordered by how much you manage. Feature
// and compatibility claims are coarse; verify against current docs for the chosen service.
export const sqlFamily: Scene = {
  id: 'sql-family',
  title: 'Three ways to run SQL on Azure',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'More convenience, less control',
      headers: ['Option', 'Azure manages', 'You manage', 'Fits'],
      values: [
        ['SQL Database', 'engine, patching, HA', 'schema, queries', 'new cloud apps'],
        ['SQL Managed Instance', 'engine, patching, HA', 'instance-level settings', 'near-full SQL Server compatibility'],
        ['SQL Server on a VM', 'the hardware', 'OS, engine, backups', 'full control, special needs'],
      ],
    },
    {
      id: 'ladder',
      label: 'Decide from requirements',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'compat', label: 'Compatibility', sub: 'features the app needs', pattern: 'network', icon: 'circlecheck' },
        { id: 'ops', label: 'Operations', sub: 'who patches and backs up', pattern: 'user', icon: 'wrench' },
        { id: 'net', label: 'Networking', sub: 'private access needs', pattern: 'service', icon: 'vnet' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'ladder', label: 'weigh' }],
}
