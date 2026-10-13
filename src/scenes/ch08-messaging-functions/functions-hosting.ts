import type { Scene } from '@graphlearning/flow'

// Ch8 §3 — hosting plan decides scaling, networking and instance behaviour. Flex Consumption is the
// serverless option to evaluate for NEW apps where it is available; plan names and eligibility
// change, so none of the figures are quoted.
export const functionsHosting: Scene = {
  id: 'ch08-functions-hosting',
  title: 'Choosing a Functions hosting plan',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'plans',
      kind: 'table',
      label: 'Hosting plans, by what they buy you',
      headers: ['Plan', 'Scaling', 'Networking', 'Fits'],
      values: [
        ['Flex Consumption', 'per function, to zero', 'VNet supported', 'new serverless apps'],
        ['Consumption', 'to zero', 'limited', 'existing apps, simple tasks'],
        ['Premium', 'pre-warmed instances', 'VNet supported', 'low latency, steady load'],
        ['Dedicated', 'App Service plan rules', 'plan features', 'already own a plan'],
      ],
    },
    {
      id: 'owners',
      label: 'Who retries, per trigger',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-queue', label: 'Queue trigger', sub: 'queue redelivers, then poison', pattern: 'service', icon: 'queue' },
        { id: 'o-sb', label: 'Service Bus trigger', sub: 'lock, retries, dead-letter', pattern: 'service', icon: 'servicebus' },
        { id: 'o-http', label: 'HTTP trigger', sub: 'the caller retries', pattern: 'network', icon: 'globe' },
        { id: 'o-timer', label: 'Timer trigger', sub: 'next run, not a retry', pattern: 'network', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'plans', target: 'owners', label: 'and retry ownership differs' }],
}
