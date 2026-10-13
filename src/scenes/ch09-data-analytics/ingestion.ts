import type { Scene } from '@graphlearning/flow'

// Ch9 §2 — four ways to move operational data into analytics, each with failure modes. The watermark
// query uses a half-open window so a run never double-counts or skips a boundary row; it still
// misses hard deletes and updates that skip the timestamp.
export const ingestion: Scene = {
  id: 'ch09-ingestion',
  title: 'Getting orders into the lake',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'methods',
      kind: 'table',
      label: 'Four ways to ingest',
      headers: ['Method', 'How', 'Watch for'],
      values: [
        ['Full load', 'copy everything', 'cost, time'],
        ['Watermark', 'rows since last run', 'missed deletes'],
        ['CDC', 'read the change log', 'setup, schema drift'],
        ['Event stream', 'consume as it happens', 'duplicates, order'],
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'incremental extract',
      label: `SELECT *
FROM orders
WHERE updated_at >  @last_watermark
  AND updated_at <= @run_start;`,
    },
    {
      id: 'checks',
      label: 'Prove it arrived',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'contract', label: 'Source contract', sub: 'columns and meaning', pattern: 'user', icon: 'scroll' },
        { id: 'counts', label: 'Row counts', sub: 'source equals target', pattern: 'service', icon: 'hash' },
        { id: 'sums', label: 'Totals', sub: 'money reconciles', pattern: 'storage', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'methods', target: 'query', label: 'for example' },
    { source: 'query', target: 'checks', label: 'then reconcile' },
  ],
}
