import type { Scene } from '@graphlearning/flow'

// Ch10 §7 — build once, promote the same artefact through environments, record provenance, and know
// when Terraform is the better fit. Comparison is of shape, not a recommendation; verify provider
// currency before choosing.
export const promotion: Scene = {
  id: 'ch10-promotion',
  title: 'Build once, promote, and prove it',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'pipeline',
      label: 'One artefact, three environments',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'build', label: 'Build once', sub: 'image digest, commit SHA', pattern: 'user', icon: 'file' },
        { id: 'dev', label: 'Development', sub: 'automatic', pattern: 'service', icon: 'appservice' },
        { id: 'test', label: 'Test', sub: 'automatic, with checks', pattern: 'network', icon: 'shieldcheck' },
        { id: 'prod', label: 'Production', sub: 'approval, same artefact', pattern: 'warn', icon: 'lock' },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Bicep or Terraform?',
      headers: ['', 'Bicep', 'Terraform'],
      values: [
        ['Scope', 'Azure only', 'many providers'],
        ['State', 'tracked by Azure', 'a state file you protect'],
        ['New Azure features', 'follow the platform', 'may lag the provider'],
      ],
    },
    { id: 'prov', label: 'Provenance', sub: 'who built what, from which commit', pattern: 'storage', icon: 'scroll' },
  ],
  edges: [
    { source: 'pipeline', target: 'compare', label: 'defined with' },
    { source: 'compare', target: 'prov', label: 'and recorded as' },
  ],
}
