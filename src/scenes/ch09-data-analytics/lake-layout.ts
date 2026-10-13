import type { Scene } from '@graphlearning/flow'

// Ch9 §3 — a folder layout that makes partition pruning possible, and how RBAC and ACLs combine
// depending on how the caller authenticates. Evaluation order shown is for Microsoft Entra
// principals; shared keys and SAS do not evaluate ACLs.
export const lakeLayout: Scene = {
  id: 'ch09-lake-layout',
  title: 'Folders, formats and who may read them',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'paths',
      kind: 'code',
      filename: 'ADLS Gen2 paths',
      label: `raw/orders/ingest_date=2026-10-13/part-0001.parquet
curated/orders/order_date=2026-10-12/part-0001.parquet
serving/daily_sales/part-0001.parquet`,
    },
    {
      id: 'auth',
      kind: 'table',
      label: 'How a request is authorised',
      headers: ['Caller uses', 'RBAC data role', 'ACL'],
      values: [
        ['Entra identity', 'checked first', 'checked only if RBAC does not allow'],
        ['Account key', 'bypassed', 'not evaluated'],
        ['SAS token', 'its own grant', 'not evaluated'],
      ],
    },
    {
      id: 'pruning',
      label: 'Layout choices',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'zones', label: 'Zones', sub: 'raw, curated, serving', pattern: 'storage', icon: 'folder' },
        { id: 'parquet', label: 'Parquet', sub: 'columnar, compressed', pattern: 'service', icon: 'table' },
        { id: 'prune', label: 'Partition by date', sub: 'queries skip folders', pattern: 'network', icon: 'funnel' },
      ],
    },
  ],
  edges: [
    { source: 'paths', target: 'auth', label: 'protected by' },
    { source: 'auth', target: 'pruning', label: 'design for' },
  ],
}
