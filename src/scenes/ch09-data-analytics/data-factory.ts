import type { Scene } from '@graphlearning/flow'

// Ch9 §4 — a pipeline chains activities on a schedule; Data Factory orchestrates, other engines
// compute. The JSON is a trimmed Copy activity. Catalog and lineage are a governance product's job.
export const dataFactory: Scene = {
  id: 'ch09-data-factory',
  title: 'A pipeline from SQL to the lake and back',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'copy',
      kind: 'code',
      filename: 'Copy activity (trimmed)',
      label: `{ "name": "CopyOrders", "type": "Copy",
  "inputs":  [{ "referenceName": "SqlOrders" }],
  "outputs": [{ "referenceName": "LakeRawOrders" }],
  "typeProperties": {
    "source": { "type": "AzureSqlSource" },
    "sink":   { "type": "ParquetSink" } } }`,
    },
    {
      id: 'pipeline',
      label: 'Pipeline: nightly-orders',
      sub: 'triggered by a schedule',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'p-copy', label: 'Copy to raw', sub: 'SQL to Parquet', pattern: 'service', icon: 'datafactory' },
        { id: 'p-clean', label: 'Transform', sub: 'clean and join', pattern: 'network', icon: 'gears' },
        { id: 'p-load', label: 'Load summary', sub: 'curated to SQL', pattern: 'storage', icon: 'sqldatabase' },
        { id: 'p-alert', label: 'Alert on failure', sub: 'someone owns it', pattern: 'warn', icon: 'bell' },
      ],
    },
    {
      id: 'owners',
      label: 'Who owns what',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'orch', label: 'Data Factory', sub: 'runs the steps', pattern: 'service', icon: 'datafactory' },
        { id: 'catalog', label: 'Catalogue', sub: 'what data exists', pattern: 'user', icon: 'purview' },
        { id: 'lineage', label: 'Lineage', sub: 'where it came from', pattern: 'network', icon: 'gitbranch' },
      ],
    },
  ],
  edges: [
    { source: 'copy', target: 'pipeline', label: 'is one step of' },
    { source: 'pipeline', target: 'owners', label: 'governed by' },
  ],
}
