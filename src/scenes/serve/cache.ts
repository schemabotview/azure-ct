import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { serveTree } from './tree'
import code from '../../../spine/serve/08-cache/project/tools/cache_headroom.py?raw'
import session from '../../../spine/serve/08-cache/session.txt?raw'

// Cache-aside: read the cache, on a miss read the database and fill the cache with a time to live;
// deleting the cached entry when the data changes shortens staleness but cannot remove it (a reader
// can refill an old value between the write and the delete). Azure Managed Redis is the managed
// Redis offering; it supports Microsoft Entra authentication with access keys disabled. Plain Python
// model, run locally.
// source: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
// source: https://learn.microsoft.com/en-us/azure/redis/overview
export const cache: Scene = ideFrame(
  'cache-headroom',
  'risk-on-azure',
  serveTree('08', 'tools/cache_headroom.py', ['tools/cache_headroom.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'tools/cache_headroom.py', code, show: [[8, 19]], highlight: [11, 14, 15], pattern: 'storage', terminal: session, emulated: false },
  {
    id: 'cache-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'stale',
        kind: 'table',
        label: 'How stale is too stale',
        headers: ['use', 'from'],
        values: [
          ['dashboard tile', 'cache, ≤ 60 s old'],
          ['dealer’s screen', 'cache, deleted on write'],
          ['reserving headroom', 'the mart, always'],
          ['the 07:00 report', 'gold, never a cache'],
        ],
      },
      {
        id: 'cache-rules',
        kind: 'list',
        icon: 'redis',
        label: 'Rules for the cache',
        pattern: 'storage',
        items: [
          'Every entry has a time to live',
          'A write deletes what it changed',
          'A decision never reads the cache',
          'If the cache is down, the mart answers',
        ],
      },
    ],
  },
)
