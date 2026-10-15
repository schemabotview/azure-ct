import type { Scene } from '@graphlearning/flow'

// Ch11 §3 — what is collected by default and what needs a diagnostic setting. The audit event is a
// trimmed Activity Log entry. Retention figures vary and are not quoted.
export const diagnostics: Scene = {
  id: 'diagnostics',
  title: 'What is recorded, and what is not',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'sources',
      kind: 'table',
      label: 'Telemetry availability is not collection',
      headers: ['Source', 'Without extra setup'],
      values: [
        ['Platform metrics', 'collected for a limited time'],
        ['Activity Log', 'control-plane events, kept briefly'],
        ['Resource logs', 'not collected until configured'],
        ['App telemetry', 'needs an SDK or agent'],
      ],
    },
    {
      id: 'audit',
      kind: 'code',
      filename: 'an Activity Log entry (trimmed)',
      label: `{ "operationName": "Microsoft.Authorization/roleAssignments/write",
  "caller": "priya@contoso.com",
  "status": "Succeeded",
  "eventTimestamp": "2026-10-13T09:15:02Z" }`,
    },
    {
      id: 'dest',
      label: 'A diagnostic setting routes to',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-law', label: 'Log Analytics', sub: 'query and alert', pattern: 'service', icon: 'loganalytics' },
        { id: 'd-sa', label: 'Storage account', sub: 'cheap, long retention', pattern: 'storage', icon: 'storage' },
        { id: 'd-eh', label: 'Event Hubs', sub: 'stream to a SIEM', pattern: 'network', icon: 'eventhubs' },
      ],
    },
  ],
  edges: [
    { source: 'sources', target: 'audit', label: 'for example' },
    { source: 'audit', target: 'dest', label: 'kept via' },
  ],
}
