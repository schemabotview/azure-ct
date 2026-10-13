import type { Scene } from '@graphlearning/flow'

// Ch6 §3 — five ways to be authorised against blobs, from narrow to broad. A SAS is a signed URL:
// whoever holds it has what it grants until it expires. Values are placeholders.
export const accessMethods: Scene = {
  id: 'ch06-access-methods',
  title: 'Ways to authorise a blob request',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'methods',
      kind: 'table',
      label: 'From narrow to broad',
      headers: ['Method', 'Grants', 'Ends when'],
      values: [
        ['Managed identity + role', 'what the role allows', 'role removed'],
        ['User delegation SAS', 'one blob or container', 'expiry'],
        ['Service SAS', 'one blob or container', 'expiry or key rotated'],
        ['Account key', 'everything in the account', 'key rotated'],
      ],
    },
    {
      id: 'sas',
      kind: 'code',
      filename: 'a SAS URL (placeholder)',
      label: `https://stcontosoretail.blob.core.windows.net
  /receipts/order-1042.json
  ?sp=r            # read only
  &sr=b            # one blob
  &se=2026-10-14T09:00Z   # expires
  &sig=<signature>`,
    },
    { id: 'prefer', label: 'Prefer identity', sub: 'no secret to leak', pattern: 'user', icon: 'managedidentity' },
  ],
  edges: [
    { source: 'methods', target: 'sas', label: 'a SAS looks like' },
    { source: 'sas', target: 'prefer', label: 'but' },
  ],
}
