import type { Scene } from '@graphlearning/flow'

// Ch10 §1 — Bicep declares resources; it compiles to an ARM template; ARM does the work. The API
// version in the resource type pins the shape of the resource. Version value must be re-checked.
export const bicepBasics: Scene = {
  id: 'bicep-basics',
  title: 'A resource declared in Bicep',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'bicep',
      kind: 'code',
      filename: 'main.bicep',
      label: `param appName string
param location string = resourceGroup().location

resource plan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: 'plan-\${appName}'
  location: location
  kind: 'linux'
  sku: { name: 'B1' }
  properties: { reserved: true }
}`,
    },
    {
      id: 'chain',
      label: 'From file to resource',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c1', label: 'Bicep file', sub: 'what you review', pattern: 'user', icon: 'file' },
        { id: 'c2', label: 'ARM template', sub: 'compiled JSON', pattern: 'network', icon: 'template' },
        { id: 'c3', label: 'Deployment', sub: 'ARM creates it', pattern: 'service', icon: 'gears' },
      ],
    },
    {
      id: 'parts',
      label: 'Reading the resource line',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'type', label: 'Type', sub: 'provider and kind', pattern: 'storage', icon: 'tag' },
        { id: 'api', label: 'API version', sub: '@2023-12-01', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'bicep', target: 'chain', label: 'compiled to' },
    { source: 'chain', target: 'parts', label: 'and declared with' },
  ],
}
