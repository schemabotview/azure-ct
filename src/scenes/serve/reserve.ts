import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { serveTree } from './tree'
import code from '../../../spine/serve/04-reserve/project/tools/reserve_headroom.py?raw'
import session from '../../../spine/serve/04-reserve/session.txt?raw'

// PostgreSQL's default isolation is READ COMMITTED, under which two transactions can each read the
// same headroom and both insert (write skew). SERIALIZABLE (serializable snapshot isolation) detects
// the conflict and fails one with SQLSTATE 40001 (serialization_failure), which the application
// retries. Real PostgreSQL 16, run locally.
// source: https://www.postgresql.org/docs/16/transaction-iso.html
export const reserve: Scene = ideFrame(
  'two-deals-one-limit',
  'risk-on-azure',
  serveTree('04', 'tools/reserve_headroom.py', ['tools/reserve_headroom.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/reserve_headroom.py', code, show: [[9, 10], [16, 16], [20, 29]], highlight: [16, 20, 24, 27], pattern: 'storage', terminal: session },
  {
    id: 'reserve-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'isolation',
        kind: 'table',
        label: 'Two isolation levels',
        headers: ['level', 'two at once'],
        values: [
          ['READ COMMITTED', 'both commit: −0.40'],
          ['SERIALIZABLE', 'one refused: 40001'],
          ['a lock (FOR UPDATE)', 'one waits, then sees 0.60'],
        ],
      },
      {
        id: 'reserve-rule',
        kind: 'list',
        icon: 'lock',
        label: 'The mart’s rule for money',
        pattern: 'warn',
        items: [
          'Check and hold in one transaction',
          'SERIALIZABLE for every reservation',
          'A 40001 is retried, from the check',
          'The database refuses: not the API',
        ],
      },
    ],
  },
)
