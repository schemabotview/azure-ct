import type { Scene } from '@graphlearning/flow'

// Ch4 §3 — routing picks the most specific prefix; a user-defined route beats a system route for the
// same prefix. Default outbound access is being phased out for new networks: show explicit paths.
export const routesOutbound: Scene = {
  id: 'ch04-routes-outbound',
  title: 'Routes and outbound paths',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'routes',
      kind: 'table',
      label: 'Effective routes for snet-web',
      headers: ['Prefix', 'Next hop', 'Source'],
      values: [
        ['10.20.0.0/16', 'Virtual network', 'system'],
        ['0.0.0.0/0', 'Internet', 'system'],
        ['0.0.0.0/0', 'Firewall 10.20.9.4', 'user-defined'],
      ],
    },
    {
      id: 'outbound',
      label: 'Ways out to the internet',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'default', label: 'Default outbound', sub: 'implicit, being retired', pattern: 'warn', icon: 'ban' },
        { id: 'nat', label: 'NAT gateway', sub: 'explicit, stable IP', pattern: 'service', icon: 'natgateway' },
        { id: 'firewall', label: 'Firewall', sub: 'inspected egress', pattern: 'network', icon: 'firewall' },
      ],
    },
  ],
  edges: [{ source: 'routes', target: 'outbound', label: 'next hop decides' }],
}
