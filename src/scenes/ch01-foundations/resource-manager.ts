import type { Scene } from '@graphlearning/flow'

// Ch1 §4 — every management call, whatever the client, goes through Azure Resource Manager, which
// routes it to the resource provider that owns the resource type. Control plane only: reading
// blob contents or running SQL does not travel this path (that distinction is Chapter 2).
export const resourceManager: Scene = {
  id: 'ch01-resource-manager',
  title: 'Every management call goes through ARM',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    {
      id: 'clients',
      label: 'Clients',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'portal', label: 'Portal', pattern: 'user', icon: 'dashboard' },
        { id: 'cli', label: 'Azure CLI', pattern: 'user', icon: 'terminal' },
        { id: 'bicep', label: 'Templates', sub: 'ARM or Bicep', pattern: 'user', icon: 'template' },
      ],
    },
    {
      id: 'arm',
      label: 'Resource Manager',
      sub: 'ARM: access and routing',
      pattern: 'network',
      icon: 'gears',
    },
    {
      id: 'providers',
      label: 'Resource providers',
      sub: 'registered per subscription',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'p-web', label: 'Web apps', sub: 'Microsoft.Web', pattern: 'service', icon: 'appservice' },
        { id: 'p-sql', label: 'SQL', sub: 'Microsoft.Sql', pattern: 'storage', icon: 'sqldatabase' },
        { id: 'p-storage', label: 'Storage', sub: 'Microsoft.Storage', pattern: 'storage', icon: 'storage' },
      ],
    },
  ],
  edges: [
    { source: 'clients', target: 'arm', label: 'REST request' },
    { source: 'arm', target: 'providers', label: 'by resource type' },
  ],
}
