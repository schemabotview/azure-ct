import type { Scene } from '@graphlearning/flow'

// Ch2 §6 — a policy rule is an if/then over resource properties; the effect decides what happens.
// Policy constrains the SHAPE of resources; it is not access control and not proof of app security.
export const policy: Scene = {
  id: 'policy',
  title: 'A policy rule and its effects',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'rule',
      kind: 'code',
      filename: 'policyRule',
      label: `{
  "if": {
    "field": "location",
    "notIn": ["swedencentral", "northeurope"]
  },
  "then": { "effect": "deny" }
}`,
    },
    {
      id: 'effects',
      label: 'The effect decides the outcome',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'audit', label: 'Audit', sub: 'flag it, allow it', pattern: 'network', icon: 'search' },
        { id: 'deny', label: 'Deny', sub: 'reject the request', pattern: 'warn', icon: 'ban' },
        { id: 'modify', label: 'Modify', sub: 'add or change fields', pattern: 'service', icon: 'pencil' },
        { id: 'dine', label: 'Deploy if missing', sub: 'DeployIfNotExists', pattern: 'storage', icon: 'policy' },
      ],
    },
    {
      id: 'results',
      label: 'Afterwards',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'compliance', label: 'Compliance', sub: 'per resource, per policy', pattern: 'user', icon: 'compliance' },
        { id: 'remediate', label: 'Remediation task', sub: 'fix existing resources', pattern: 'user', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'rule', target: 'effects', label: 'then' },
    { source: 'effects', target: 'results', label: 'evaluated' },
  ],
}
