import type { Course } from '../types'
import { apiManagement } from './01-api-management'
import { azureFunctionsTriggersAndBindings } from './02-azure-functions-triggers-and-bindings'
import { functionsHostingPlansAndRetryOwnership } from './03-functions-hosting-plans-and-retry-ownership'
import { queueStorageVersusServiceBus } from './04-queue-storage-versus-service-bus'
import { serviceBusLocksAndSettlement } from './05-service-bus-locks-and-settlement'
import { eventGridEventDistribution } from './06-event-grid-event-distribution'
import { eventHubsPartitionsAndCheckpoints } from './07-event-hubs-partitions-and-checkpoints'
import { logicAppsAndDurableFunctions } from './08-logic-apps-and-durable-functions'
import { retriesIdempotencyAndBackpressure } from './09-retries-idempotency-and-backpressure'

// Chapter 8 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch08MessagingFunctions: Course = {
  id: 'ch08-messaging-functions',
  title: 'APIs, Functions, and Asynchronous Workflows',
  sections: [
    apiManagement,
    azureFunctionsTriggersAndBindings,
    functionsHostingPlansAndRetryOwnership,
    queueStorageVersusServiceBus,
    serviceBusLocksAndSettlement,
    eventGridEventDistribution,
    eventHubsPartitionsAndCheckpoints,
    logicAppsAndDurableFunctions,
    retriesIdempotencyAndBackpressure,
  ],
}
