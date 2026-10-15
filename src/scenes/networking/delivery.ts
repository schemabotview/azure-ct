import type { Scene } from '@graphlearning/flow'

// Ch4 §7 — choose by protocol layer and scope first, then features. They can be combined.
export const delivery: Scene = {
  id: 'delivery',
  title: 'Which delivery service',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Three ways to spread requests',
      headers: ['Service', 'Layer', 'Scope', 'Adds'],
      values: [
        ['Load Balancer', 'L4 TCP/UDP', 'regional', 'speed, simplicity'],
        ['Application Gateway', 'L7 HTTP', 'regional', 'URL routing, WAF'],
        ['Front Door', 'L7 HTTP', 'global edge', 'caching, WAF, failover'],
      ],
    },
    {
      id: 'path',
      label: 'The shop request path',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'browser', label: 'Browser', sub: 'shop.contoso.com', pattern: 'user', icon: 'users' },
        { id: 'dns-step', label: 'DNS', sub: 'resolves the name', pattern: 'external', icon: 'dns' },
        { id: 'edge', label: 'Front Door', sub: 'TLS and WAF', pattern: 'network', icon: 'frontdoor' },
        { id: 'origin', label: 'App Service', sub: 'the origin', pattern: 'service', icon: 'appservice' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'path', label: 'one possible choice' }],
}
