import type { Scene } from '@graphlearning/flow'

// Ch7 §8 — cache-aside, a stale-cache timeline, and cutover choices. Redis product naming is in
// transition: Azure Cache for Redis has a retirement path; Azure Managed Redis is the current
// choice. Dates are not quoted — verify at publication.
export const caching: Scene = {
  id: 'caching',
  title: 'A cache, its staleness, and a cutover',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'aside',
      kind: 'code',
      filename: 'cache-aside',
      label: `def get_price(sku):
    price = cache.get(f"price:{sku}")
    if price is None:
        price = db.query_price(sku)
        cache.set(f"price:{sku}", price, ex=300)
    return price`,
    },
    {
      id: 'stale',
      kind: 'table',
      label: 'A stale-cache timeline (TTL 300 s)',
      headers: ['Time', 'Event', 'Shopper sees'],
      values: [
        ['0 s', 'price 18 cached', '18'],
        ['60 s', 'price changed to 20', '18 (stale)'],
        ['300 s', 'entry expires, reload', '20'],
      ],
    },
    {
      id: 'cutover',
      label: 'Moving to a new database',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'copy', label: 'Copy and sync', sub: 'bulk, then changes', pattern: 'service', icon: 'copy' },
        { id: 'reconcile', label: 'Reconcile', sub: 'counts and checksums', pattern: 'network', icon: 'circlecheck' },
        { id: 'rollback', label: 'Plan the way back', sub: 'before the cutover', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'aside', target: 'stale', label: 'leaves a window' },
    { source: 'stale', target: 'cutover', label: 'and when moving' },
  ],
}
