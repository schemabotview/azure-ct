import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/serve/09-move/project/infra/11-migrate-tradebook.sh?raw'

// The migration service in Azure Database for PostgreSQL flexible server moves databases from
// on-premises or other PostgreSQL servers, offline or online (initial copy, then changes through
// logical replication until cutover). It moves schema and data; it does not move roles' passwords,
// change the application's connection strings, or decide the cutover moment. A source on-premises
// needs network reach from Azure (here, ExpressRoute). Not run: the script is checked by the Azure
// CLI's own parser, and the properties file against the SDK's Migration model.
// source: https://learn.microsoft.com/en-us/azure/postgresql/migrate/migration-service/overview-migration-service-postgresql
// source: https://learn.microsoft.com/en-us/azure/postgresql/migrate/migration-service/concepts-required-user-permissions
// source: https://learn.microsoft.com/en-us/cli/azure/postgres/flexible-server/migration
export const move: Scene = mapFrame('moving-tradebook', BUILT_BY[11], {
  id: 'move-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'move-script', kind: 'code', filename: 'infra/11-migrate-tradebook.sh', label: code.replace(/\n+$/, ''), highlight: [10, 11, 16], pattern: 'storage' },
    {
      id: 'cutover-steps',
      kind: 'table',
      label: 'The cutover weekend',
      headers: ['step', 'who'],
      values: [
        ['1. full copy, then changes, all week', 'the migration service'],
        ['2. reconcile counts and sums nightly', 'the platform (Course 8)'],
        ['3. Saturday 06:00: TradeBook stops writing', 'the deals team'],
        ['4. last changes land; reconcile again', 'the platform'],
        ['5. cutover; the app points at Azure', 'migration service, app team'],
        ['6. keep the old server, read-only, a month', 'the database team'],
      ],
    },
    {
      id: 'service-does',
      kind: 'table',
      label: 'What the migration service does and does not',
      headers: ['does', 'does not'],
      values: [
        ['copy schema and data', 'change the app’s connection'],
        ['replicate changes until cutover', 'move roles’ passwords'],
        ['validate before it starts', 'choose the moment'],
      ],
    },
  ],
})
