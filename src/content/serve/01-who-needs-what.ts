import type { Section } from '../types'

export const whoNeedsWhat: Section = {
  id: 'who-needs-what',
  title: 'Who needs what',
  scene: 'who-needs-what',
  narration:
    "Gold holds the answers; this course puts them where each reader can use them, and each reader asks something different. The table at the top lists three readers. The exposure A P I serves the dealers: it is asked for Wide World's headroom, now, hundreds of times a second, which needs one row by key, in milliseconds. It is also asked to reserve one million of that headroom for a deal in progress, a few times a minute, which needs a transaction that cannot overbook. The risk team, in Power B I, asks for exposure by group, by country and by day, all day long, which needs S Q L: joins, sums and history. And the regulator receives the seven o'clock large exposures file once a day, which must be complete, dated and unchangeable. One store cannot do all of that well, so the table at the bottom left gives each ask its own. The risk mart, on PostgreSQL, answers headroom, reservations and the reports, because it has transactions and S Q L. The group lookup, on Cosmos D B, answers a group and its members, by one key, at any scale. A cache, on Redis, answers the dashboard's headroom, fast, but possibly seconds old. And Course seven's locked reports keep the regulator's file, which nobody can change. The list on the right is the rule that holds them together. A decision, such as approving a reservation, reads the mart, never the cache. Every copy says how old it may be. And gold stays the source: every one of these stores can be reloaded from it. Next, which relational database the mart should be.",
}
