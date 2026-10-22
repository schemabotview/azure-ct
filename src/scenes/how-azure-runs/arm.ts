import type { Scene, SceneNode } from '@graphlearning/flow'

// Every management operation goes to Azure Resource Manager at management.azure.com, which
// authenticates the caller's Microsoft Entra token, authorises it with Azure RBAC, applies Azure
// Policy and locks, and hands the request to the resource provider for that type. Data-plane
// operations go to the resource's own endpoint. A resource provider must be registered in a
// subscription before its types can be created there.
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-providers-and-types
const client = (id: string, label: string, icon: string): SceneNode => ({ id, label, icon, pattern: 'user', variant: 'tile' })
const check = (id: string, label: string): SceneNode => ({ id, label, variant: 'chip', icon: 'none', pattern: 'warn' })
const provider = (id: string, label: string, icon: string): SceneNode => ({ id, label, icon, pattern: 'service', variant: 'chip' })

export const arm: Scene = {
  id: 'arm-requests',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'path',
      label: 'One front door for every change',
      bare: true,
      children: [
        {
          id: 'clients',
          label: 'Clients',
          pattern: 'group',
          icon: 'none',
          cols: 5,
          children: [
            client('portal', 'Portal', 'dashboard'),
            client('cli', 'Azure CLI', 'terminal'),
            client('ps', 'PowerShell', 'powershell'),
            client('sdk', 'SDKs', 'code'),
            client('bicep', 'Bicep', 'template'),
          ],
        },
        {
          id: 'arm',
          label: 'Azure Resource Manager',
          sub: 'management.azure.com',
          icon: 'allresources',
          pattern: 'network',
          cols: 4,
          children: [check('c-token', 'Entra token'), check('c-rbac', 'RBAC'), check('c-policy', 'Policy'), check('c-locks', 'locks')],
        },
        {
          id: 'providers',
          label: 'Resource providers',
          pattern: 'group',
          icon: 'none',
          cols: 1,
          children: [
            provider('p-storage', 'Microsoft.Storage', 'storage'),
            provider('p-network', 'Microsoft.Network', 'vnet'),
            provider('p-adf', 'Microsoft.DataFactory', 'datafactory'),
          ],
        },
      ],
      edges: [
        { source: 'clients', target: 'arm', label: 'HTTPS + token' },
        { source: 'arm', target: 'providers' },
      ],
    },
    {
      id: 'planes-side',
      label: 'Two planes',
      bare: true,
      children: [
        {
          id: 'planes',
          kind: 'table',
          label: 'Control plane and data plane',
          headers: ['', 'control plane', 'data plane'],
          values: [
            ['example', 'create the lake account', 'read a file in it'],
            ['address', 'management.azure.com', 'stwgriskprod.blob.core…'],
            ['who checks', 'Resource Manager', 'the service itself'],
            ['permission', 'Azure RBAC actions', 'RBAC data actions, or a key'],
            ['logged in', 'the Activity Log', 'the service’s own logs'],
          ],
        },
        {
          id: 'means',
          kind: 'list',
          icon: 'circlecheck',
          label: 'What this means',
          pattern: 'storage',
          items: [
            'The portal is not special: it calls the same API as the CLI',
            'Anything clicked can be scripted, and anything scripted can be declared',
            'Owning a resource does not mean being able to read its data',
            'A provider not registered in a subscription cannot be used there',
          ],
        },
      ],
    },
  ],
  edges: [],
}
