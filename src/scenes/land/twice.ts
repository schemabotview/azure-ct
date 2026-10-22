import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { landTree } from './tree'
import code from '../../../spine/land/04-twice/project/tools/two_deliveries.py?raw'
import session from '../../../spine/land/04-twice/session.txt?raw'

// Blob Storage is last-writer-wins unless a write is conditional. Every write changes the blob's ETag;
// If-Match / If-None-Match make a read or write depend on it (If-None-Match: * — write only if the
// name is new — fails with 409 BlobAlreadyExists). A lease (15 to 60 seconds, or infinite) gives one
// holder exclusive write and delete access; a write without the lease ID fails with 412.
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations
// source: https://learn.microsoft.com/en-us/rest/api/storageservices/lease-blob
export const twice: Scene = ideFrame(
  'two-deliveries',
  'risk-on-azure',
  landTree('04', 'tools/two_deliveries.py', ['tools/two_deliveries.py'], ['.github', 'budgets', 'infra', 'policies', 'templates']),
  { file: 'tools/two_deliveries.py', code, show: [[29, 36], [40, 41], [44, 48]], highlight: [32, 35, 36, 41, 44], pattern: 'storage', terminal: session },
  {
    id: 'twice-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'conditions',
        kind: 'table',
        label: 'Making a write depend on the file',
        headers: ['header', 'means'],
        values: [
          ['none', 'the last write wins'],
          ['If-None-Match: *', 'only if the name is new'],
          ['If-Match: <ETag>', 'only if unchanged'],
          ['x-ms-lease-id', 'only the lease holder'],
        ],
      },
      {
        id: 'landing-rule',
        kind: 'list',
        icon: 'file',
        label: 'The landing zone’s rule',
        pattern: 'storage',
        items: [
          'One dated path per delivery',
          'Written once: a second copy is refused',
          'A correction is a new file, not a change',
          'A reader pins the ETag it started with',
        ],
      },
    ],
  },
)
