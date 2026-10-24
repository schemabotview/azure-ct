import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/evolve/08-region/project/infra/14-second-region.sh?raw'

// Changing a storage account's redundancy from ZRS to GZRS is a conversion that runs in the
// background; a customer-managed failover makes the secondary primary and leaves the account LRS
// there. PostgreSQL flexible server geo-restore creates a new server in the paired Region from
// geo-redundant backups. Each step's undo is stated in the script; the last is not undone.
// source: https://learn.microsoft.com/en-us/azure/storage/common/redundancy-migration
// source: https://learn.microsoft.com/en-us/azure/storage/common/storage-failover-customer-managed-unplanned
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-restore-server-cli
export const region: Scene = mapFrame('second-region', [...BUILT_BY[13], 'fd'], {
  id: 'region-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'region-code', kind: 'code', filename: 'infra/14-second-region.sh', label: code.replace(/\n+$/, ''), show: [[7, 16], [18, 23]], highlight: [9, 14, 23], pattern: 'network' },
    {
      id: 'boundaries',
      kind: 'table',
      label: 'Each step, and the way back',
      headers: ['step', 'undo', 'until'],
      values: [
        ['lake to GZRS', 'back to ZRS', 'any time'],
        ['mart rehearsed in UK West', 'delete it', 'any time'],
        ['one night rehearsed there', 'nothing to undo', 'any time'],
        ['lake failed over', 'none: migrate back', 'the boundary'],
      ],
    },
  ],
})
