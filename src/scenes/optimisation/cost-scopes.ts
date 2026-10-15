import type { Scene } from '@graphlearning/flow'

// Ch12 §3 — where cost is reported and how to attribute it. Billing hierarchy names differ by
// agreement type; the principle (a scope hierarchy plus tags) is what is taught.
export const costScopes: Scene = {
  id: 'cost-scopes',
  title: 'Where cost is reported, and what drives it',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'drivers',
      kind: 'table',
      label: 'Typical cost drivers',
      headers: ['Driver', 'Grows with'],
      values: [
        ['Compute', 'size x hours reserved'],
        ['Storage', 'GB kept and operations'],
        ['Data transfer', 'bytes leaving a region'],
        ['Logs and metrics', 'GB ingested and retained'],
        ['Idle capacity', 'headroom nobody uses'],
      ],
    },
    {
      id: 'scopes',
      label: 'Cost can be viewed at',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sc1', label: 'Billing account', sub: 'the whole agreement', pattern: 'user', icon: 'receipt' },
        { id: 'sc2', label: 'Subscription', sub: 'one environment', pattern: 'service', icon: 'subscription' },
        { id: 'sc3', label: 'Resource group', sub: 'one workload', pattern: 'network', icon: 'resourcegroup' },
        { id: 'sc4', label: 'Tag', sub: 'owner, team, purpose', pattern: 'storage', icon: 'tags' },
      ],
    },
  ],
  edges: [{ source: 'drivers', target: 'scopes', label: 'attributed through' }],
}
