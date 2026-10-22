import type { Course } from '../types'
import { whoNeedsWhat } from './01-who-needs-what'
import { relationalChoices } from './02-relational-choices'
import { theRiskMart } from './03-the-risk-mart'
import { twoDealsOneLimit } from './04-two-deals-one-limit'
import { connectionsAndCredentials } from './05-connections-and-credentials'
import { aLookupByGroup } from './06-a-lookup-by-group'
import { consistencyAndConcurrencyInCosmosDb } from './07-consistency-and-concurrency-in-cosmos-db'
import { cachingTheHeadroom } from './08-caching-the-headroom'
import { movingTradebook } from './09-moving-tradebook'

// Course 11 — Serve the results. Who needs what, the relational choice, the PostgreSQL risk mart,
// serializable reservations, safe retries, a Cosmos DB lookup, its concurrency, a cache, TradeBook's move.
export const serve: Course = {
  id: 'serve',
  title: 'Serve the results',
  sections: [
    whoNeedsWhat,
    relationalChoices,
    theRiskMart,
    twoDealsOneLimit,
    connectionsAndCredentials,
    aLookupByGroup,
    consistencyAndConcurrencyInCosmosDb,
    cachingTheHeadroom,
    movingTradebook,
  ],
}
