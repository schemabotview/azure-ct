import type { Section } from '../types'

export const cachingTheHeadroom: Section = {
  id: 'caching-the-headroom',
  title: 'Caching the headroom',
  scene: 'cache-headroom',
  narration:
    "The dashboard asks for headroom far more often than it changes, so a cache sits in front of the mart, on Azure Managed Redis, signed in with Entra I D and no access keys. A cache answers fast because it answers from a copy, and a copy can be old. The editor shows tools slash cache headroom dot py, a plain Python model of cache aside: read the cache; on a miss, read the mart and keep the answer for sixty seconds. At ten seconds, a dealer reserves one million of Wide World's one point six. The terminal shows what the dashboard displays every ten seconds. With expiry alone, it shows one point six until the sixty second copy expires, fifty seconds after the headroom had fallen to nought point six. With the writer also deleting the cached copy when it commits, the dashboard shows nought point six from ten seconds on. Deleting on write narrows the gap but cannot close it completely, because a reader can refill the cache with the old value between the write and the delete, so the time to live stays as a backstop. The table on the right decides how stale is too stale, use by use. A dashboard tile can be up to sixty seconds old. A dealer's screen reads the cache, deleted on write. Reserving headroom reads the mart, always, as the last two sections showed. And the seven o'clock report comes from gold, never from a cache. The list underneath is the cache's rules: every entry has a time to live, a write deletes what it changed, a decision never reads the cache, and if the cache is down, the mart answers, more slowly. Next, moving TradeBook itself into Azure.",
}
