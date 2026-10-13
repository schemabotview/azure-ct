import type { Scene } from '@graphlearning/flow'

// Ch12 §4 — measured utilisation drives rightsizing; commitments suit steady use, not guesses.
// Lower price does not imply lower environmental impact: utilisation and operational limits matter.
// Utilisation figures are synthetic.
export const rightsizing: Scene = {
  id: 'ch12-rightsizing',
  title: 'Sized for what is measured',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'util',
      kind: 'table',
      label: 'Average utilisation (synthetic)',
      headers: ['Resource', 'Avg CPU', 'Action'],
      values: [
        ['vm-orders-01', '8 %', 'resize down'],
        ['plan-retail-prod', '65 %', 'keep, watch'],
        ['plan-retail-dev', 'idle at night', 'schedule off'],
        ['db-retail', '30 %, spiky', 'serverless or autoscale'],
      ],
    },
    {
      id: 'levers',
      label: 'Levers, in order of risk',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lv1', label: 'Delete unused', sub: 'no downside', pattern: 'service', icon: 'trash' },
        { id: 'lv2', label: 'Resize and schedule', sub: 'measure first', pattern: 'network', icon: 'scale' },
        { id: 'lv3', label: 'Commit to steady use', sub: 'reservations, plans', pattern: 'warn', icon: 'cost' },
        { id: 'lv4', label: 'Re-architect', sub: 'largest effort', pattern: 'storage', icon: 'gitbranch' },
      ],
    },
    { id: 'green', label: 'Sustainability', sub: 'higher utilisation, not just lower price', pattern: 'user', icon: 'gauge' },
  ],
  edges: [
    { source: 'util', target: 'levers', label: 'then pull' },
    { source: 'levers', target: 'green', label: 'and weigh' },
  ],
}
