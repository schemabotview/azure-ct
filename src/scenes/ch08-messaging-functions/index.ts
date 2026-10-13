import type { Scene } from '@graphlearning/flow'
import { apim } from './apim'
import { functionHandler } from './function-handler'
import { functionsHosting } from './functions-hosting'
import { queueVsServicebus } from './queue-vs-servicebus'
import { servicebusSettlement } from './servicebus-settlement'
import { eventGrid } from './event-grid'
import { eventHubs } from './event-hubs'
import { orchestration } from './orchestration'
import { idempotency } from './idempotency'

// One bundle per course folder, spread into src/scenes/index.ts.
export const ch08Scenes: Scene[] = [apim, functionHandler, functionsHosting, queueVsServicebus, servicebusSettlement, eventGrid, eventHubs, orchestration, idempotency]
