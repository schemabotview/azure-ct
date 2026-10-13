import type { Scene } from '@graphlearning/flow'

// Ch1 §1 — who operates each layer as the service model moves from on-premises to SaaS. A table
// rather than a stack diagram: the point is the shifting boundary, and a row read across shows it.
// Simplified teaching view; Microsoft's own shared-responsibility chart has more rows.
export const operatingModels: Scene = {
  id: 'ch01-operating-models',
  title: 'Who operates each layer',
  flow: 'TB',
  nodes: [
    {
      id: 'responsibility',
      kind: 'table',
      label: 'The retail web site, four ways to run it',
      headers: ['Layer', 'On-prem', 'IaaS (VM)', 'PaaS (App Service)', 'SaaS'],
      values: [
        ['Data, accounts, access', 'You', 'You', 'You', 'You'],
        ['Application code', 'You', 'You', 'You', 'Vendor'],
        ['Network controls', 'You', 'Shared', 'Shared', 'Vendor'],
        ['OS and patching', 'You', 'You', 'Azure', 'Vendor'],
        ['Hosts and datacenter', 'You', 'Azure', 'Azure', 'Vendor'],
      ],
    },
    {
      id: 'always',
      label: 'Never outsourced',
      sub: 'your data and who may reach it',
      pattern: 'warn',
      icon: 'shieldcheck',
    },
  ],
  edges: [{ source: 'responsibility', target: 'always', label: 'whatever the model' }],
}
