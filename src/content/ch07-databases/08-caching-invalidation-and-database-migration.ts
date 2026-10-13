import type { Section } from '../types'

// Ch7 §8. Reference: Cache-aside pattern; Azure Managed Redis and Azure Cache for Redis retirement guidance; Azure Database Migration Service.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Verify current Redis product names and retirement dates; Azure Cache for Redis is a migration context, not a default new deployment.
export const cachingInvalidationAndDatabaseMigration: Section = {
  id: 'caching-invalidation-and-database-migration',
  title: 'Caching, invalidation and database migration',
  scene: 'ch07-caching',
  focus: 'stale',
  slide: `## Caches and their staleness

### Cache-aside
- Check the **cache** first
- On a miss, read the **database** and store the result
- Set a **TTL** so entries expire

### Staleness
- A cached value can be **old** until it expires or is invalidated
- Decide how stale is **acceptable** per item

### Products
- **Azure Managed Redis** is the current choice for new caches
- **Azure Cache for Redis** is a **retirement and migration** context: verify the dates

### Migrating a database
- Copy in bulk, then **sync changes**
- **Reconcile** counts and checksums
- Plan the **way back** before cutover`,
  narration:
    "A cache puts hot data in fast memory in front of the database. The most common pattern is cache-aside, shown in the card. Look in the cache first. If the value is missing, read it from the database, store it in the cache with a time to live, and return it. The cost of that speed is staleness. The table runs a timeline. A price of eighteen is cached, and at sixty seconds the real price changes to twenty. Until the entry expires at three hundred seconds, shoppers still see eighteen. So decide, for each kind of data, how stale is acceptable, and invalidate explicitly when it is not. A word on products. Azure Managed Redis is the current choice for new caches, while Azure Cache for Redis is on a retirement path, so treat it as a migration context and verify the dates. The same mindset applies when moving to a new database. Copy the bulk, then keep syncing changes. Reconcile counts and checksums, so you can prove nothing was lost. And plan the way back before you cut over, because rollback is hardest after the fact. With data in place, we can connect the pieces with APIs and messages.",
}
