import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/land/06-reports/project/templates/modules/reports.bicep?raw'
import lock from '../../../spine/land/06-reports/project/infra/07-lock-reports.sh?raw'

// Container-level WORM: a time-based retention policy on a container protects every blob in it
// against overwrite and delete for the retention interval. An unlocked policy (for testing) can be
// shortened or removed; a locked one cannot be deleted or shortened, and can be extended at most five
// times. A container with a locked policy can be deleted only when empty. Microsoft recommends
// locking within about 24 hours of testing. The seven-year retention is the bank's rule (assumed).
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-container-level-worm-policies
// source: https://learn.microsoft.com/en-us/cli/azure/storage/container/immutability-policy
export const reports: Scene = mapFrame('locked-reports', BUILT_BY[7], {
  id: 'reports-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'reports-code', kind: 'code', filename: 'templates/modules/reports.bicep', label: code.replace(/\n+$/, ''), show: [[7, 7], [22, 40]], highlight: [7, 30, 32, 35, 36], pattern: 'storage' },
    { id: 'reports-lock', kind: 'code', filename: 'infra/07-lock-reports.sh', label: lock.replace(/\n+$/, ''), highlight: [9, 11], pattern: 'warn' },
    {
      id: 'worm',
      kind: 'table',
      label: 'With the policy locked',
      headers: ['try to', 'result'],
      values: [
        ['file a new report', 'allowed'],
        ['overwrite or delete one', 'refused for seven years'],
        ['extend the retention', 'allowed, five times'],
        ['shorten or remove it', 'refused, by anyone'],
        ['delete the container', 'only when empty'],
      ],
    },
  ],
})
