import type { Scene } from '@graphlearning/flow'

// Ch10 §4 — what-if previews changes; it cannot promise success (quota, name conflicts, policy and
// runtime effects can still fail), and it is only as complete as the resource providers make it.
// Incremental mode never deletes what the template omits; Complete mode can.
export const whatIf: Scene = {
  id: 'ch10-what-if',
  title: 'Previewing a change',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'preview',
      kind: 'code',
      filename: 'az deployment group what-if (trimmed)',
      label: `~ Microsoft.Web/sites/contoso-shop-dev
    ~ properties.siteConfig.alwaysOn:
        false => true
+ Microsoft.Insights/components/ai-shop-dev
- Microsoft.Web/serverfarms/plan-old
    (only in Complete mode)`,
    },
    {
      id: 'symbols',
      label: 'Reading the symbols',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'plus', label: '+ Create', sub: 'new resource', pattern: 'service', icon: 'circlecheck' },
        { id: 'tilde', label: '~ Modify', sub: 'in place', pattern: 'network', icon: 'pencil' },
        { id: 'minus', label: '- Delete', sub: 'Complete mode', pattern: 'warn', icon: 'trash' },
        { id: 'eq', label: '= No change', sub: 'left alone', pattern: 'storage', icon: 'repeat' },
      ],
    },
    {
      id: 'limits',
      label: 'What what-if cannot promise',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'l1', label: 'That it will succeed', sub: 'quota, names, policy', pattern: 'warn', icon: 'ban' },
        { id: 'l2', label: 'Runtime effects', sub: 'restarts, data impact', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [
    { source: 'preview', target: 'symbols', label: 'uses' },
    { source: 'symbols', target: 'limits', label: 'but' },
  ],
}
