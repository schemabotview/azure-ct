import type { Scene } from '@graphlearning/flow'

// Ch4 §8 — VNet integration is OUTBOUND from an app; a private endpoint is a private INBOUND address
// for a service. Neither turns off the service's public endpoint or grants data permission. The
// lookups are synthetic; the point is which address the name resolves to.
export const privateAccess: Scene = {
  id: 'ch04-private-access',
  title: 'A private path, and the DNS that breaks it',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    { id: 'app', label: 'Web app', sub: 'with VNet integration', pattern: 'service', icon: 'appservice' },
    {
      id: 'vnet',
      label: 'vnet-retail',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'int-subnet', label: 'Integration subnet', sub: 'outbound only', pattern: 'service', icon: 'subnet' },
        { id: 'pe', label: 'Private endpoint', sub: '10.20.2.4', pattern: 'storage', icon: 'privateendpoint' },
      ],
    },
    { id: 'sql', label: 'Azure SQL', sub: 'public access disabled', pattern: 'storage', icon: 'sqldatabase' },
    {
      id: 'broken',
      kind: 'code',
      filename: 'nslookup from the app (wrong)',
      label: `sql-contoso.database.windows.net
  Address: 203.0.113.50   # public address
# private zone not linked to this VNet`,
    },
  ],
  edges: [
    { source: 'app', target: 'vnet', label: 'outbound through' },
    { source: 'vnet', target: 'sql', label: 'private IP to' },
    { source: 'sql', target: 'broken', label: 'but the name resolves', dashed: true },
  ],
}
