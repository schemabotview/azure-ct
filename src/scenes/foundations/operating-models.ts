import type { Scene } from '@graphlearning/flow'

// Ch1 §1 — who operates each layer as the service model moves from on-premises to SaaS. A table
// rather than a stack diagram: the point is the shifting boundary, and a row read across shows it.
// Simplified teaching view; Microsoft's own shared-responsibility chart has more rows.
export const operatingModels: Scene = {
  id: 'operating-models',
  title: 'Who operates each layer',
  flow: 'TB',
  padding: 0.05,
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
      id: 'moves',
      label: 'The boundary moves, service by service',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-iaas', label: 'IaaS', sub: 'you patch the VM', pattern: 'service', icon: 'vm' },
        { id: 'm-paas', label: 'PaaS', sub: 'you deploy code', pattern: 'service', icon: 'appservice' },
        { id: 'm-saas', label: 'SaaS', sub: 'you configure it', pattern: 'service', icon: 'cloud' },
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
  edges: [
    { source: 'responsibility', target: 'moves', label: 'read across' },
    { source: 'moves', target: 'always', label: 'whatever the model' },
  ],
}
