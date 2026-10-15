import type { Scene } from '@graphlearning/flow'

// Ch11 §2 — a first KQL query over a SMALL SYNTHETIC `requests` table, and the output it would
// produce. Column names follow Application Insights (timestamp, name, duration in ms).
export const kql: Scene = {
  id: 'kql',
  title: 'Asking the logs a question',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'Log Analytics (KQL)',
      label: `requests
| where timestamp > ago(1h)
| summarize calls = count(),
            p95_ms = percentile(duration, 95)
        by name
| order by p95_ms desc`,
    },
    {
      id: 'output',
      kind: 'table',
      label: 'Expected output (synthetic data)',
      headers: ['name', 'calls', 'p95_ms'],
      values: [
        ['POST /orders', '212', '1900'],
        ['GET /products/{id}', '1840', '310'],
        ['GET /healthz', '3600', '4'],
      ],
    },
    {
      id: 'stack',
      label: 'Where the data lives',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ai', label: 'Application Insights', sub: 'app telemetry', pattern: 'service', icon: 'appinsights' },
        { id: 'law', label: 'Log Analytics', sub: 'the workspace', pattern: 'storage', icon: 'loganalytics' },
        { id: 'monitor', label: 'Azure Monitor', sub: 'the umbrella', pattern: 'network', icon: 'monitor' },
      ],
    },
  ],
  edges: [
    { source: 'query', target: 'output', label: 'returns' },
    { source: 'output', target: 'stack', label: 'stored in' },
  ],
}
