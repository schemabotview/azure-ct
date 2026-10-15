import type { Scene } from '@graphlearning/flow'

// Ch12 §1 — a SYNTHETIC latency breakdown for one slow product page, and the distribution that hides
// behind an average. The bottleneck is the largest segment; changing anything else wastes effort.
export const latency: Scene = {
  id: 'latency',
  title: 'Where the time goes',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'breakdown',
      kind: 'table',
      label: 'p95 breakdown, one page (synthetic)',
      headers: ['Segment', 'ms', 'Share'],
      values: [
        ['Browser to edge', '60', '9 %'],
        ['Edge to app', '20', '3 %'],
        ['App code', '70', '11 %'],
        ['Catalogue call', '90', '14 %'],
        ['SQL query', '380', '59 %'],
        ['Render', '20', '3 %'],
      ],
    },
    {
      id: 'dist',
      kind: 'table',
      label: 'Same page, different views of one day',
      headers: ['Measure', 'Value'],
      values: [
        ['Average', '180 ms'],
        ['p95', '640 ms'],
        ['p99', '1,400 ms'],
      ],
    },
    {
      id: 'method',
      label: 'One change at a time',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm1', label: 'Measure', sub: 'percentiles, not averages', pattern: 'network', icon: 'gauge' },
        { id: 'm2', label: 'Find the largest', sub: 'the bottleneck', pattern: 'warn', icon: 'search' },
        { id: 'm3', label: 'Change one thing', sub: 'index, cache, size', pattern: 'service', icon: 'wrench' },
        { id: 'm4', label: 'Measure again', sub: 'keep what helped', pattern: 'storage', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'breakdown', target: 'dist', label: 'and across a day' },
    { source: 'dist', target: 'method', label: 'so' },
  ],
}
