import type { Course } from '../types'
import { performanceMeasurementAndBottlenecks } from './01-performance-measurement-and-bottlenecks'
import { cachingAndEdgeDelivery } from './02-caching-and-edge-delivery'
import { costAllocationBudgetsAndBillingScope } from './03-cost-allocation-budgets-and-billing-scope'
import { rightsizingCommitmentsAndSustainability } from './04-rightsizing-commitments-and-sustainability'
import { vmPaasContainerAndServerlessComparison } from './05-vm-paas-container-and-serverless-comparison'
import { migrationCutoverAndDecisionRecords } from './06-migration-cutover-and-decision-records'
import { wellArchitectedReviewAndPriorities } from './07-well-architected-review-and-priorities'

// Chapter 12 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const optimisation: Course = {
  id: 'optimisation',
  title: 'Optimisation and Architecture Evolution',
  sections: [
    performanceMeasurementAndBottlenecks,
    cachingAndEdgeDelivery,
    costAllocationBudgetsAndBillingScope,
    rightsizingCommitmentsAndSustainability,
    vmPaasContainerAndServerlessComparison,
    migrationCutoverAndDecisionRecords,
    wellArchitectedReviewAndPriorities,
  ],
}
