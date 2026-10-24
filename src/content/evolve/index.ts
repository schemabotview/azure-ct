import type { Course } from '../types'
import { measureBeforeTuning } from './01-measure-before-tuning'
import { frontDoorAndCaching } from './02-front-door-and-caching'
import { whoPaysForWhat } from './03-who-pays-for-what'
import { rightsizingAndCommitments } from './04-rightsizing-and-commitments'
import { sustainabilityTradeOffs } from './05-sustainability-trade-offs'
import { fourWaysToRunOneApi } from './06-four-ways-to-run-one-api'
import { requirementsAndADecisionRecord } from './07-requirements-and-a-decision-record'
import { migrationCutoverAndRegions } from './08-migration-cutover-and-regions'
import { aWellArchitectedReview } from './09-a-well-architected-review'

// Course 14 — Measure, tune and evolve it. Stage timings, Front Door, cost by owner, commitments,
// sustainability proxies, four ways to run the API, a decision record, a second Region, a review.
export const evolve: Course = {
  id: 'evolve',
  title: 'Measure, tune and evolve it',
  sections: [
    measureBeforeTuning,
    frontDoorAndCaching,
    whoPaysForWhat,
    rightsizingAndCommitments,
    sustainabilityTradeOffs,
    fourWaysToRunOneApi,
    requirementsAndADecisionRecord,
    migrationCutoverAndRegions,
    aWellArchitectedReview,
  ],
}
