import type { Scene } from '@graphlearning/flow'

// Ch10 §3 — values that differ per environment go in a parameter file; secrets are never written in
// a template, parameter file, output or log — reference Key Vault instead. Names synthetic.
export const parametersSecrets: Scene = {
  id: 'parameters-secrets',
  title: 'Parameters, outputs and secrets',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'params',
      kind: 'code',
      filename: 'main.dev.bicepparam',
      label: `using './main.bicep'

param appName = 'contoso-shop-dev'
param sku = 'B1'
param dbPassword = az.getSecret(
  '<subscription-id>', 'rg-retail-dev',
  'kv-contoso-retail', 'db-password')`,
    },
    {
      id: 'where',
      kind: 'table',
      label: 'Where each kind of value belongs',
      headers: ['Value', 'Goes in', 'Never in'],
      values: [
        ['Names, SKUs', 'a parameter file', 'hard-coded copies'],
        ['A secret', 'Key Vault, by reference', 'template, outputs, logs'],
        ['An ID to share', 'an output', 'a secret'],
      ],
    },
    {
      id: 'review',
      label: 'Before merging',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'r1', label: 'Search the diff', sub: 'for keys and tokens', pattern: 'warn', icon: 'search' },
        { id: 'r2', label: 'Check outputs', sub: 'build logs print them', pattern: 'warn', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'params', target: 'where', label: 'follows the rule' },
    { source: 'where', target: 'review', label: 'enforced by' },
  ],
}
