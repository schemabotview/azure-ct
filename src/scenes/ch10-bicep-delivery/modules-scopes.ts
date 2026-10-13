import type { Scene } from '@graphlearning/flow'

// Ch10 §2 — a module is a Bicep file called with parameters; references create dependencies
// automatically; targetScope picks where the deployment runs.
export const modulesScopes: Scene = {
  id: 'ch10-modules-scopes',
  title: 'Modules, references and scopes',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'main',
      kind: 'code',
      filename: 'main.bicep',
      label: `targetScope = 'resourceGroup'

resource plan 'Microsoft.Web/serverfarms@2023-12-01' = { ... }

module web 'modules/web.bicep' = {
  name: 'web'
  params: {
    appName: appName
    planId: plan.id        // a reference: plan deploys first
  }
}`,
    },
    {
      id: 'order',
      label: 'What ARM works out',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'deps', label: 'Dependencies', sub: 'from references', pattern: 'service', icon: 'gitbranch' },
        { id: 'parallel', label: 'Parallel work', sub: 'independent resources', pattern: 'network', icon: 'share' },
      ],
    },
    {
      id: 'scopes',
      label: 'Where a deployment can run',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sc-rg', label: 'Resource group', sub: 'most workloads', pattern: 'service', icon: 'resourcegroup' },
        { id: 'sc-sub', label: 'Subscription', sub: 'groups, policy', pattern: 'network', icon: 'subscription' },
        { id: 'sc-mg', label: 'Management group', sub: 'wide policy', pattern: 'storage', icon: 'managementgroup' },
        { id: 'sc-tenant', label: 'Tenant', sub: 'rare, high privilege', pattern: 'warn', icon: 'tenant' },
      ],
    },
  ],
  edges: [
    { source: 'main', target: 'order', label: 'gives ARM' },
    { source: 'order', target: 'scopes', label: 'within a' },
  ],
}
