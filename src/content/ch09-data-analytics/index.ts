import type { Course } from '../types'
import { operationalVersusAnalytical } from './01-operational-versus-analytical'
import { ingestionCdcAndReconciliation } from './02-ingestion-cdc-and-reconciliation'
import { adlsGen2LayoutFormatsAndAccess } from './03-adls-gen2-layout-formats-and-access'
import { dataFactoryPipelinesAndGovernance } from './04-data-factory-pipelines-and-governance'
import { synapseDatabricksAndFabric } from './05-synapse-databricks-and-fabric'
import { streamingAnalyticsLateDataAndCost } from './06-streaming-analytics-late-data-and-cost'

// Chapter 9 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch09DataAnalytics: Course = {
  id: 'ch09-data-analytics',
  title: 'Data Integration and Analytical Workloads',
  sections: [
    operationalVersusAnalytical,
    ingestionCdcAndReconciliation,
    adlsGen2LayoutFormatsAndAccess,
    dataFactoryPipelinesAndGovernance,
    synapseDatabricksAndFabric,
    streamingAnalyticsLateDataAndCost,
  ],
}
