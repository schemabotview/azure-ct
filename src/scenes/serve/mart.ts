import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/serve/03-mart/project/templates/modules/mart.bicep?raw'
import session from '../../../spine/serve/03-mart/session.txt?raw'

// Flexible server: compute tiers Burstable, General Purpose, Memory Optimized; zone-redundant high
// availability keeps a synchronous standby in another zone and fails over automatically; backups are
// automatic (7 to 35 days), optionally geo-redundant to the paired Region; point-in-time restore
// creates a NEW server. Microsoft Entra authentication can be the only method. Private endpoints are
// supported for servers with public access mode. Here the mart runs on the local PostgreSQL 16.
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-compute
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-high-availability
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-backup-restore
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-azure-ad-authentication
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-networking-private-link
export const mart: Scene = mapFrame('risk-mart', [...BUILT_BY[10], 'mart'], {
  id: 'mart-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'mart-code', kind: 'code', filename: 'templates/modules/mart.bicep', label: code.replace(/\n+$/, ''), show: [[8, 26]], highlight: [11, 13, 15, 17, 20, 23], pattern: 'storage' },
    { id: 'mart-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · PostgreSQL 16, local', label: session.replace(/\n+$/, '') },
    {
      id: 'mart-failures',
      kind: 'table',
      label: 'When something breaks',
      headers: ['event', 'what happens'],
      values: [
        ['zone 1 lost', 'standby in zone 3 takes over'],
        ['a bad load at 06:10', 'restore to 06:00: a new server'],
        ['UK South lost', 'restore from the UK West copy'],
      ],
    },
  ],
})
