import type { Scene } from '@graphlearning/flow'

// Ch11 §6 — security services overlap in name but not in job. Detection is not prevention. Product
// names and packaging change; the roles, not the SKUs, are the point.
export const securityServices: Scene = {
  id: 'ch11-security-services',
  title: 'Who prevents, who detects, who responds',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'map',
      kind: 'table',
      label: 'Roles of the security services',
      headers: ['Service', 'Mainly', 'Not'],
      values: [
        ['Azure Policy', 'prevents bad configuration', 'a threat detector'],
        ['WAF', 'blocks common web attacks', 'full application security'],
        ['Defender for Cloud', 'finds weak posture, raises threats', 'a fix by itself'],
        ['Microsoft Sentinel', 'correlates and responds', 'a log source'],
      ],
    },
    {
      id: 'stages',
      label: 'Prevent, detect, respond',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 's-prevent', label: 'Prevent', sub: 'policy, WAF, NSG', pattern: 'service', icon: 'shieldcheck' },
        { id: 's-detect', label: 'Detect', sub: 'Defender, alerts', pattern: 'warn', icon: 'defender' },
        { id: 's-respond', label: 'Respond', sub: 'Sentinel, runbooks', pattern: 'network', icon: 'sentinel' },
      ],
    },
  ],
  edges: [{ source: 'map', target: 'stages', label: 'fit into' }],
}
