import type { Scene } from '@graphlearning/flow'

// Ch1 §3 — tenant ⊃ subscription ⊃ resource group ⊃ resource, drawn as nesting. Names are synthetic.
// The tenant is an identity boundary; the subscription carries billing and quota; the resource group
// carries lifecycle. None of the three is a network boundary.
export const ownershipTree: Scene = {
  id: 'ownership-tree',
  title: 'Tenant, subscription, resource group',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    {
      id: 'tenant',
      label: 'contoso',
      sub: 'Entra tenant · identities live here',
      pattern: 'user',
      cols: 2,
      children: [
        {
          id: 'sub-prod',
          label: 'contoso-prod',
          sub: 'Subscription · billing, quota',
          pattern: 'group',
          children: [
            {
              id: 'rg-prod',
              label: 'rg-retail-prod',
              sub: 'Resource group · lifecycle',
              pattern: 'service',
              children: [
                { id: 'web-prod', label: 'Web app', pattern: 'service', icon: 'appservice' },
                { id: 'sql-prod', label: 'SQL database', pattern: 'storage', icon: 'sqldatabase' },
              ],
            },
          ],
        },
        {
          id: 'sub-dev',
          label: 'contoso-dev',
          sub: 'Subscription · own bill, quota',
          pattern: 'group',
          children: [
            {
              id: 'rg-dev',
              label: 'rg-retail-dev',
              sub: 'Resource group · throwaway',
              pattern: 'service',
              children: [{ id: 'web-dev', label: 'Web app', pattern: 'service', icon: 'appservice' }],
            },
          ],
        },
      ],
    },
    { id: 'invoice', label: 'Billing account', sub: 'who pays', pattern: 'external', icon: 'receipt' },
  ],
  edges: [{ source: 'tenant', target: 'invoice', label: 'subscriptions are billed' }],
}
