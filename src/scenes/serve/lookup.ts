import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { serveTree } from './tree'
import code from '../../../spine/serve/06-lookup/project/tools/group_lookup.py?raw'
import session from '../../../spine/serve/06-lookup/session.txt?raw'

// Cosmos DB for NoSQL: a container's partition key spreads items over physical partitions; all
// items with one key value form a logical partition (at most 20 GB) served by one physical
// partition (at most 10,000 RU/s). A point read by id and key of a 1 KB item costs 1 RU; a query
// with the key stays in one partition; a query without it fans out to every partition. Throughput
// is divided evenly across physical partitions, so one busy key can be throttled (429) while the
// container is under its total. The emulator (vNext) reports a flat request charge, so RUs here
// come from the documentation, not from the run.
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/request-units
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/concepts-limits
export const lookup: Scene = ideFrame(
  'group-lookup',
  'risk-on-azure',
  serveTree('06', 'tools/group_lookup.py', ['tools/group_lookup.py', 'env.sh'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/group_lookup.py', code, show: [[11, 12], [23, 31]], highlight: [12, 23, 27, 31], pattern: 'storage', terminal: session },
  {
    id: 'lookup-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'ru-costs',
        kind: 'table',
        label: 'What each read costs',
        headers: ['read', 'request units'],
        values: [
          ['id and key, 1 KB', '1 RU'],
          ['query, one key', 'a few, one partition'],
          ['query, no key', 'a few × every partition'],
        ],
      },
      {
        id: 'hot-partition',
        kind: 'table',
        label: 'One giant group, a hot partition',
        headers: ['', 'today', 'if 40% is one group'],
        values: [
          ['lookups/s', '1,200', '3,000'],
          ['busiest partition', '300 RU/s', '1,200 RU/s'],
          ['its share of 4,000', '1,000 RU/s', '1,000: throttled'],
        ],
      },
    ],
  },
)
