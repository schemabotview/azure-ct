import type { Scene } from '@graphlearning/flow'

// Ch12 §2 — what may be cached at the edge depends on whether the response is the same for everyone.
// The cache key decides what counts as the same request; a personal response with a shared key leaks
// one user's data to another. TTLs are illustrative.
export const edgeCaching: Scene = {
  id: 'ch12-edge-caching',
  title: 'What the edge may cache',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'rules',
      kind: 'table',
      label: 'Caching decisions for the shop',
      headers: ['Request', 'Same for all?', 'Edge cache'],
      values: [
        ['GET /products/42', 'yes', 'yes, 5 min'],
        ['GET /images/bottle.png', 'yes', 'yes, 1 day'],
        ['GET /cart', 'no, per user', 'never shared'],
        ['POST /orders', 'a write', 'no'],
      ],
    },
    {
      id: 'key',
      label: 'What shapes the cache',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-key', label: 'Cache key', sub: 'URL, query string, headers', pattern: 'network', icon: 'key' },
        { id: 'k-ttl', label: 'TTL', sub: 'how long it stays fresh', pattern: 'service', icon: 'clock' },
        { id: 'k-purge', label: 'Purge', sub: 'remove a changed item now', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [{ source: 'rules', target: 'key', label: 'enforced by' }],
}
