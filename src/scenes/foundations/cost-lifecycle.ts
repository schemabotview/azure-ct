import type { Scene } from '@graphlearning/flow'

// Ch1 §6 — a HYPOTHETICAL ledger (no prices on purpose; rates vary by SKU, Region and date) showing
// that deleting the app does not delete what it left behind, plus the three controls that help.
export const costLifecycle: Scene = {
  id: 'cost-lifecycle',
  title: 'What keeps costing after the app is gone',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'ledger',
      kind: 'table',
      label: 'Hypothetical ledger: the web app is deleted, nothing else is',
      headers: ['Left behind', 'What it is billed on', 'Still billed?'],
      values: [
        ['Web app (deleted)', 'runs on the plan', 'No'],
        ['App Service plan', 'reserved compute, hourly', 'Yes'],
        ['Unattached disk', 'provisioned size', 'Yes'],
        ['Public IP address', 'hours allocated', 'Yes'],
        ['Snapshot', 'stored size', 'Yes'],
        ['Log data', 'GB ingested and kept', 'Yes'],
      ],
    },
    {
      id: 'controls',
      label: 'Four habits that help',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tags', label: 'Tag it', sub: 'owner, env, purpose', pattern: 'service', icon: 'tags' },
        { id: 'budget', label: 'Budget it', sub: 'alerts, never a cap', pattern: 'warn', icon: 'costbudgets' },
        { id: 'review', label: 'Review it', sub: 'is it still needed?', pattern: 'service', icon: 'search' },
        { id: 'cleanup', label: 'Delete the group', sub: 'after checking', pattern: 'storage', icon: 'resourcegroup' },
      ],
    },
  ],
  edges: [{ source: 'ledger', target: 'controls', label: 'so' }],
}
