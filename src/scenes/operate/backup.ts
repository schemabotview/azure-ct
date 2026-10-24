import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/08-backup/project/templates/modules/backup.bicep?raw'
import session from '../../../spine/operate/08-backup/session.txt?raw'

// PostgreSQL flexible server takes its own backups (here 14 days, geo-redundant) and restores to a
// point in time onto a NEW server; Azure Backup adds long-term retention for it in a Backup vault
// (Microsoft.DataProtection), whose vault identity needs a role on the server (not shown). Vault
// soft delete 'AlwaysOn' and immutability 'Locked' cannot be switched off afterwards. The drill
// runs on local PostgreSQL 16: pg_dump and pg_restore stand in for the service's backup and
// restore; what it checks (a new database, known numbers, then delete it) is the same.
// source: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-backup-restore
// source: https://learn.microsoft.com/en-us/azure/backup/backup-azure-database-postgresql-flex-overview
// source: https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept
// source: https://learn.microsoft.com/en-us/azure/backup/secure-by-default
export const backup: Scene = ideFrame(
  'restore-drill',
  'risk-on-azure',
  operateTree('08', 'templates/modules/backup.bicep', ['templates/modules/backup.bicep', 'tools/restore_drill.py', 'infra/13-restore-drill.sh'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'kql', 'policies', 'sql'], ['infra', 'templates', 'templates/modules', 'tools']),
  { file: 'templates/modules/backup.bicep', code, show: [[18, 28]], highlight: [21, 23, 25, 26], pattern: 'storage', terminal: session, emulated: false },
  {
    id: 'backup-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'backups-held',
        kind: 'table',
        label: 'What can be restored',
        headers: ['part', 'from'],
        values: [
          ['risk mart', '14 days, any minute'],
          ['risk mart', 'weekly, a year, locked'],
          ['lake files', 'soft delete, 14 days'],
          ['the reports', 'WORM: never changed'],
          ['code, templates', 'git'],
        ],
      },
      {
        id: 'drill-rules',
        kind: 'list',
        icon: 'circlecheck',
        label: 'A drill that proves something',
        pattern: 'storage',
        items: [
          'Restore to a new server, never over',
          'Check numbers known beforehand',
          'Time it: that is the real RTO',
          'Delete the copy afterwards',
        ],
      },
    ],
  },
)
