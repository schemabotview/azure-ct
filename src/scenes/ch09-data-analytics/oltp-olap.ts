import type { Scene } from '@graphlearning/flow'

// Ch9 §1 — operational and analytical systems answer different questions with different shapes of
// data. The retail questions on the right are the analytical ones.
export const oltpOlap: Scene = {
  id: 'ch09-oltp-olap',
  title: 'Operational versus analytical needs',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'contrast',
      kind: 'table',
      label: 'Same orders, two jobs',
      headers: ['Concern', 'Operational', 'Analytical'],
      values: [
        ['Query shape', 'one order by key', 'scan and aggregate'],
        ['History', 'current state', 'years of history'],
        ['Freshness', 'immediate', 'minutes to a day'],
        ['Users', 'the application', 'analysts and reports'],
        ['Layout', 'normalised rows', 'columnar, wide'],
      ],
    },
    {
      id: 'questions',
      label: 'Questions only the analytical side answers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'q1', label: 'Best sellers?', sub: 'last quarter, all history', pattern: 'service', icon: 'barchart' },
        { id: 'q2', label: 'Revenue by week?', sub: 'by region', pattern: 'service', icon: 'barchart' },
        { id: 'q3', label: 'Did last month move?', sub: 'old values kept', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'contrast', target: 'questions', label: 'so' }],
}
