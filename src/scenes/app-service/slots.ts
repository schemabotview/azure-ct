import type { Scene } from '@graphlearning/flow'

// Ch3 §6 — a slot is a live copy of the app with its own hostname, sharing the plan's resources.
// Swap moves traffic after warm-up. Slots need a qualifying tier. Sticky settings stay with the slot.
export const slots: Scene = {
  id: 'slots',
  title: 'Production and staging slots',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Same app, two slots',
      headers: ['', 'production', 'staging'],
      values: [
        ['Hostname', 'contoso-shop', 'contoso-shop-staging'],
        ['Code version', 'v12', 'v13'],
        ['CATALOG_URL', 'prod value', 'test value'],
        ['Traffic', '100 %', '0 %'],
      ],
    },
    {
      id: 'plan',
      label: 'One App Service plan',
      sub: 'both slots share its instances',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'prod', label: 'Production slot', sub: 'serves customers', pattern: 'service', icon: 'appservice' },
        { id: 'staging', label: 'Staging slot', sub: 'warmed up and tested', pattern: 'warn', icon: 'appservice' },
      ],
    },
    { id: 'swap', label: 'Swap', sub: 'routing flips, not code', pattern: 'user', icon: 'repeat' },
  ],
  edges: [
    { source: 'compare', target: 'plan', label: 'lives on' },
    { source: 'plan', target: 'swap', label: 'when ready' },
  ],
}
