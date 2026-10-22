import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { serveTree } from './tree'
import code from '../../../spine/serve/07-update/project/tools/group_update.py?raw'
import session from '../../../spine/serve/07-update/session.txt?raw'

// Cosmos DB consistency levels, strongest first: Strong, Bounded staleness, Session (the default:
// a client reads its own writes), Consistent prefix, Eventual. Every item has an _etag; a replace
// with If-Match fails with 412 if the item changed. A transactional batch runs up to 100 operations
// on items with the same partition key, all or none. The emulator runs in one Region, so the
// consistency levels' differences are not visible here.
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/database-transactions-optimistic-concurrency
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/transactional-batch
export const update: Scene = ideFrame(
  'cosmos-concurrency',
  'risk-on-azure',
  serveTree('07', 'tools/group_update.py', ['tools/group_update.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/group_update.py', code, show: [[15, 21], [25, 32]], highlight: [17, 18, 26, 27, 29], pattern: 'storage', terminal: session },
  {
    id: 'update-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'consistency',
        kind: 'table',
        label: 'Consistency levels',
        headers: ['level', 'a reader may see'],
        values: [
          ['Strong', 'the latest, always'],
          ['Bounded staleness', 'up to K or T behind'],
          ['Session (ours)', 'its own writes, in order'],
          ['Consistent prefix', 'old, never out of order'],
          ['Eventual', 'anything, eventually'],
        ],
      },
      {
        id: 'batch-rules',
        kind: 'list',
        icon: 'cosmos',
        label: 'A transactional batch',
        pattern: 'storage',
        items: [
          'One partition key, up to 100 operations',
          'All applied, or none',
          'Moving a counterparty between groups: two keys, no batch',
        ],
      },
    ],
  },
)
