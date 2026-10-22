import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { landTree } from './tree'
import code from '../../../spine/land/05-lifecycle/project/templates/modules/lifecycle.bicep?raw'
import session from '../../../spine/land/05-lifecycle/session.txt?raw'

// Access tiers: hot, cool (minimum 30 days), cold (90), archive (180, offline: rehydration can take
// up to 15 hours); moving or deleting earlier incurs an early-deletion charge. Lifecycle management
// rules tier or delete blobs by age and prefix. Blob versioning is NOT supported on accounts with a
// hierarchical namespace, and soft delete there does not keep a blob's state on overwrite — so the
// lake's protection against an overwrite is write-once landing plus re-loading bronze from it.
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview
export const lifecycle: Scene = ideFrame(
  'lake-lifecycle',
  'risk-on-azure',
  landTree('05', 'templates/modules/lifecycle.bicep', ['templates/modules/lifecycle.bicep', 'tools/lifecycle_plan.py'], ['.github', 'budgets', 'data', 'infra', 'policies'], ['tools']),
  { file: 'templates/modules/lifecycle.bicep', code, show: [[15, 15], [18, 20], [25, 25], [28, 32]], highlight: [15, 20, 25, 31, 32], pattern: 'storage', terminal: session, emulated: false },
  {
    id: 'lifecycle-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'tiers',
        kind: 'table',
        label: 'Access tiers',
        headers: ['tier', 'keep for', 'read'],
        values: [
          ['hot', '—', 'at once'],
          ['cool', '30 days', 'at once, dearer'],
          ['cold', '90 days', 'at once, dearer'],
          ['archive', '180 days', 'after ≤ 15 hours'],
        ],
      },
      {
        id: 'recover',
        kind: 'table',
        label: 'Getting a file back, in the lake',
        headers: ['what happened', 'then'],
        values: [
          ['deleted, ≤ 14 days', 'undelete it'],
          ['overwritten', 'no versions: reload'],
          ['a wrong bronze file', 'reload from landing'],
          ['landing copy gone', 'ask the source'],
        ],
      },
    ],
  },
)
