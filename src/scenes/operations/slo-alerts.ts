import type { Scene } from '@graphlearning/flow'

// Ch11 §4 — an objective, the error budget it implies, and the alert path. 99.9 % of a 30-day month
// (43,200 minutes) leaves 43.2 minutes of budget. Targets are illustrative, not recommendations.
export const sloAlerts: Scene = {
  id: 'slo-alerts',
  title: 'An objective and the alert behind it',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'slo',
      kind: 'table',
      label: 'Illustrative objectives for the order API',
      headers: ['Indicator', 'Target', 'Allowed bad'],
      values: [
        ['Requests succeeding', '99.9 % per 30 days', '43.2 min equivalent'],
        ['p95 latency', 'under 500 ms', '5 % of requests'],
      ],
    },
    {
      id: 'path',
      label: 'From signal to action',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a1', label: 'Alert rule', sub: 'burns budget fast', pattern: 'warn', icon: 'alerts' },
        { id: 'a2', label: 'Action group', sub: 'who and how to tell', pattern: 'network', icon: 'bell' },
        { id: 'a3', label: 'Runbook', sub: 'first safe steps', pattern: 'service', icon: 'automation' },
        { id: 'a4', label: 'Named owner', sub: 'someone answers', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'slo', target: 'path', label: 'drives' }],
}
