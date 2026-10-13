import type { Scene } from '@graphlearning/flow'

// Ch11 §1 — three telemetry signals, and a correlation ID that joins them. The log line is
// structured (machine-readable fields) so it can be queried; values are synthetic.
export const signals: Scene = {
  id: 'ch11-signals',
  title: 'Metrics, logs and traces',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Three signals, three questions',
      headers: ['Signal', 'Answers', 'Shape'],
      values: [
        ['Metric', 'is it healthy?', 'numbers over time'],
        ['Log', 'what happened?', 'one event, full detail'],
        ['Trace', 'where did time go?', 'a request across services'],
      ],
    },
    {
      id: 'log',
      kind: 'code',
      filename: 'a structured log line',
      label: `{"ts":"2026-10-13T09:15:02Z","level":"error",
 "msg":"catalog call failed",
 "operation_id":"a1b2c3","order_id":1042,
 "duration_ms":2400}`,
    },
    {
      id: 'join',
      label: 'One ID joins them',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'j1', label: 'Request', sub: 'operation_id a1b2c3', pattern: 'user', icon: 'globe' },
        { id: 'j2', label: 'Dependency call', sub: 'operation_id a1b2c3', pattern: 'service', icon: 'database' },
        { id: 'j3', label: 'Log line', sub: 'operation_id a1b2c3', pattern: 'storage', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'log', label: 'a log looks like' },
    { source: 'log', target: 'join', label: 'carries an ID that' },
  ],
}
