import type { Scene } from '@graphlearning/flow'

// Ch12 §7 — one integrated review across the five Well-Architected pillars, then a prioritised list
// justified by evidence. Findings are drawn from earlier chapters; the ranking is illustrative.
export const wafReview: Scene = {
  id: 'waf-review',
  title: 'An integrated Well-Architected review',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'pillars',
      label: 'Five pillars, one finding each',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-rel', label: 'Reliability', sub: 'restore never tested', pattern: 'warn', icon: 'repeat' },
        { id: 'p-sec', label: 'Security', sub: 'storage keys still on', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'p-cost', label: 'Cost', sub: 'idle dev plan at night', pattern: 'network', icon: 'cost' },
        { id: 'p-ops', label: 'Operations', sub: 'alerts without owners', pattern: 'service', icon: 'bell' },
        { id: 'p-perf', label: 'Performance', sub: 'SQL query is 59 %', pattern: 'storage', icon: 'gauge' },
      ],
    },
    {
      id: 'ranked',
      kind: 'table',
      label: 'Improvements, ranked by evidence and effort',
      headers: ['#', 'Improvement', 'Why now', 'Effort'],
      values: [
        ['1', 'Test a database restore', 'unproven recovery claim', 'low'],
        ['2', 'Disable storage keys', 'bypasses roles', 'low'],
        ['3', 'Index the slow query', '59 % of p95', 'medium'],
        ['4', 'Schedule dev plan off', 'steady waste', 'low'],
      ],
    },
  ],
  edges: [{ source: 'pillars', target: 'ranked', label: 'prioritised as' }],
}
