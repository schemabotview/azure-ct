import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/06-reconcile/project/tools/reconcile.py?raw'
import session from '../../../spine/batch/06-reconcile/session.txt?raw'

// A query by modification time cannot see a row that was deleted. Change data capture reads the
// database's own log of inserts, updates and deletes instead: PostgreSQL logical decoding, which
// change data capture tools (Debezium, for one) read. TradeBook here is a local
// PostgreSQL 16 database (real), bronze is the storage emulator.
// source: https://www.postgresql.org/docs/16/logicaldecoding-explanation.html
// source: https://debezium.io/documentation/reference/stable/connectors/postgresql.html
export const reconcile: Scene = ideFrame(
  'reconcile-tradebook',
  'risk-on-azure',
  batchTree('06', 'tools/reconcile.py', ['tools/reconcile.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/reconcile.py', code, show: [[12, 12], [18, 24], [27, 32]], highlight: [12, 21, 22, 28, 30], pattern: 'service', terminal: session },
  {
    id: 'reconcile-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'batch-or-cdc',
        kind: 'table',
        label: 'Two ways to copy changes',
        headers: ['', 'window', 'log (CDC)'],
        values: [
          ['reads', 'changed rows', 'the change log'],
          ['deletes', 'unseen', 'seen'],
          ['on TradeBook', 'a query a day', 'a slot'],
          ['behind by', 'a day', 'minutes'],
        ],
      },
      {
        id: 'reconcile-rules',
        kind: 'list',
        icon: 'scale',
        label: 'Reconciling, every night',
        pattern: 'warn',
        items: [
          'Count and sum on both sides',
          'List every deal that differs',
          'A difference stops the report run',
          'LC-2007: deleted in TradeBook, kept in bronze',
        ],
      },
    ],
  },
)
