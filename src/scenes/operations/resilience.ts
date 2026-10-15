import type { Scene } from '@graphlearning/flow'

// Ch11 §10 — a throttled call (429) should be retried with backoff and jitter, honouring any
// Retry-After the service sends; quotas are ceilings; resilience claims are validated by injecting
// faults, not assumed.
export const resilience: Scene = {
  id: 'resilience',
  title: 'Throttling, retries and proving resilience',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'retry',
      kind: 'code',
      filename: 'retry with backoff and jitter',
      label: `for attempt in range(5):
    r = call()
    if r.status_code != 429:
        break
    wait = float(r.headers.get("Retry-After",
                               min(2 ** attempt, 30)))
    time.sleep(wait + random.random())`,
    },
    {
      id: 'limits',
      label: 'Limits you will meet',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'lq', label: 'Quota', sub: 'a ceiling per subscription', pattern: 'network', icon: 'quotas' },
        { id: 'lt', label: 'Throttling', sub: '429, slow down', pattern: 'warn', icon: 'gauge' },
        { id: 'ld', label: 'Dependency down', sub: 'timeouts, breaker', pattern: 'storage', icon: 'ban' },
      ],
    },
    {
      id: 'validate',
      label: 'Validate, do not assume',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'v1', label: 'Load test', sub: 'at expected peak', pattern: 'user', icon: 'gauge' },
        { id: 'v2', label: 'Fault injection', sub: 'Azure Chaos Studio', pattern: 'user', icon: 'bug' },
        { id: 'v3', label: 'Game day', sub: 'practise the runbook', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'retry', target: 'limits', label: 'protects against' },
    { source: 'limits', target: 'validate', label: 'proved by' },
  ],
}
