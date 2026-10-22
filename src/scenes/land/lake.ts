import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/land/02-lake/project/templates/modules/lake.bicep?raw'
import session from '../../../spine/land/02-lake/session.txt?raw'

// A storage account with a hierarchical namespace is Data Lake Storage: directories are real, so a
// rename or a permission on a folder is one operation. Azurite has no hierarchical namespace: the
// paths it shows are names containing slashes. Microsoft recommends ZRS for Data Lake Storage.
// Blob and container soft delete are supported with a hierarchical namespace.
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview
export const lake: Scene = mapFrame('lake-zones', BUILT_BY[6], {
  id: 'lake-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'lake-code', kind: 'code', filename: 'templates/modules/lake.bicep', label: code.replace(/\n+$/, ''), show: [[1, 7], [13, 15], [23, 32]], highlight: [7, 15, 27, 28, 31], pattern: 'storage' },
    { id: 'lake-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · emulated', label: session.replace(/\n+$/, '') },
    {
      id: 'lake-zone-table',
      kind: 'table',
      label: 'The four zones',
      headers: ['zone', 'holds', 'written by'],
      values: [
        ['landing', 'files as delivered, 30 days', 'sources, Data Factory'],
        ['bronze', 'everything received, kept', 'Data Factory, Event Hubs'],
        ['silver', 'cleaned, joined, typed', 'Databricks'],
        ['gold', 'what the risk team reads', 'Databricks'],
      ],
    },
  ],
})
