import type { Scene } from '@graphlearning/flow'

// Ch11 §9 — RPO is how much data you can lose, RTO how long you can be down. Numbers are
// hypothetical. A paired region is not automatic failover; Site Recovery replicates VMs but failback
// is separate work; dependencies are recovered in order.
export const rtoRpo: Scene = {
  id: 'rto-rpo',
  title: 'RPO, RTO and recovery order',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'tiers',
      kind: 'table',
      label: 'Hypothetical targets by tier',
      headers: ['Tier', 'RPO', 'RTO', 'Approach'],
      values: [
        ['Orders database', '5 min', '1 h', 'geo replica, tested failover'],
        ['Shop site', '0 (stateless)', '30 min', 'redeploy from code'],
        ['Reports', '24 h', '1 day', 'rebuild from source'],
      ],
    },
    {
      id: 'order',
      label: 'Recover in dependency order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o1', label: '1 Identity', sub: 'nobody signs in without it', pattern: 'user', icon: 'tenant' },
        { id: 'o2', label: '2 Network', sub: 'DNS and routes', pattern: 'network', icon: 'vnet' },
        { id: 'o3', label: '3 Data', sub: 'restore or fail over', pattern: 'storage', icon: 'database' },
        { id: 'o4', label: '4 Applications', sub: 'then traffic', pattern: 'service', icon: 'appservice' },
      ],
    },
    {
      id: 'cautions',
      label: 'Do not assume',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'c1', label: 'Automatic failover', sub: 'you design and test it', pattern: 'warn', icon: 'region' },
        { id: 'c2', label: 'Failback is free', sub: 'a second migration', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'tiers', target: 'order', label: 'achieved by' },
    { source: 'order', target: 'cautions', label: 'but' },
  ],
}
