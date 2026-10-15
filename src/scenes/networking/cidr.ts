import type { Scene } from '@graphlearning/flow'

// Ch4 §1 — a CIDR calculation worked once, plus the ports a request names. Azure reserves five
// addresses in every subnet (the first four and the last), so usable = total - 5. Addresses are private.
export const cidr: Scene = {
  id: 'cidr',
  title: 'Reading an address range',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'sizes',
      kind: 'table',
      label: 'How big is a prefix?',
      headers: ['Prefix', 'Addresses', 'Usable in Azure'],
      values: [
        ['/16', '65,536', '65,531'],
        ['/24', '256', '251'],
        ['/27', '32', '27'],
        ['/28', '16', '11'],
      ],
    },
    {
      id: 'reading',
      label: 'Reading 10.20.1.0/24',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'net-bits', label: 'Network bits', sub: 'first 24, fixed', pattern: 'network', icon: 'lock' },
        { id: 'host-bits', label: 'Host bits', sub: 'last 8, vary', pattern: 'service', icon: 'repeat' },
        { id: 'range', label: 'Range', sub: '10.20.1.0 to .255', pattern: 'storage', icon: 'ruler' },
        { id: 'reserved', label: 'Reserved', sub: '5 per subnet', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'ports',
      label: 'A request also names a port',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'p443', label: 'TCP 443', sub: 'HTTPS', pattern: 'user', icon: 'lock' },
        { id: 'p1433', label: 'TCP 1433', sub: 'SQL Server', pattern: 'user', icon: 'database' },
        { id: 'p53', label: 'UDP 53', sub: 'DNS', pattern: 'user', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'sizes', target: 'reading', label: 'worked once' },
    { source: 'reading', target: 'ports', label: 'plus' },
  ],
}
