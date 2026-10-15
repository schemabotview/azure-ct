import type { Scene } from '@graphlearning/flow'

// Ch2 §4 — a role assignment is principal + role + scope; permissions are the union of the
// assignments that reach a resource through its scope chain. Names and IDs are synthetic.
export const rbac: Scene = {
  id: 'rbac',
  title: 'Who, which role, at what scope',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'A scoped role matrix',
      headers: ['Principal', 'Role', 'Scope', 'Reaches'],
      values: [
        ['retail-devs', 'Contributor', 'rg-retail-dev', 'the dev group'],
        ['retail-devs', 'Reader', 'rg-retail-prod', 'the prod group'],
        ['auditors', 'Reader', 'contoso-prod', 'all of prod'],
        ['web app identity', 'Blob Data Reader', 'storage account', 'one account'],
      ],
    },
    {
      id: 'chain',
      label: 'Management group',
      sub: 'widest scope',
      pattern: 'group',
      children: [
        {
          id: 'sub',
          label: 'contoso-prod',
          sub: 'subscription: auditors Reader',
          pattern: 'group',
          children: [
            {
              id: 'rg',
              label: 'rg-retail-prod',
              sub: 'resource group: retail-devs Reader',
              pattern: 'service',
              children: [
                { id: 'res', label: 'Storage account', sub: 'inherits both, plus its own', pattern: 'storage', icon: 'storage' },
                { id: 'web', label: 'Web app', sub: 'inherits both', pattern: 'service', icon: 'appservice' },
              ],
            },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'chain', label: 'assignments flow downward' }],
}
