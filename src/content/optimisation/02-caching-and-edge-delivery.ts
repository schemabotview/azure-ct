import type { Section } from '../types'

// Ch12 §2. Reference: Azure Front Door caching; HTTP caching headers; cache key and query-string behaviour.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm Front Door cache-key and query-string options, purge behaviour, and compression defaults for the chosen tier.
export const cachingAndEdgeDelivery: Section = {
  id: 'caching-and-edge-delivery',
  title: 'Caching, Front Door and edge delivery, cache keys and freshness',
  scene: 'edge-caching',
  focus: 'rules',
  slide: `## What the edge may cache

### Cacheable
- Responses **the same for everyone**: product pages, images
- Set a **TTL** that matches how often the content changes

### Never share
- **Per-user** responses such as the cart
- Writes such as **POST**
- A personal response behind a **shared cache key** leaks data

### The cache key
- It decides what counts as **the same request**
- Include the parts that **change the response**
- Ignore the parts that **do not**, such as tracking parameters

### Freshness
- A long TTL means **stale content** after a change
- **Purge** a changed item rather than waiting`,
  narration:
    "The cheapest request is one that never reaches your origin. An edge cache, such as Front Door, stores responses close to users and answers repeat requests itself. The table decides what may be cached in our shop. A product page is the same for every visitor, so it can be cached for a few minutes. An image, for a day. A cart is different: it is personal to one user, and must never be served from a shared cache, because one customer might see another's items. A write, like creating an order, is not cached at all. The cache key decides what counts as the same request. It usually includes the path and the query string, and sometimes selected headers. Include everything that changes the response, and ignore what does not, such as a tracking parameter, or you fragment the cache. Freshness is the cost. A long time to live means shoppers may see a stale price after a change, so choose a time that matches how often the content changes, and purge a changed item when it matters. After performance, the other half of optimisation is cost.",
}
