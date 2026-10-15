import type { Scene } from '@graphlearning/flow'
import { operatingModels } from './operating-models'
import { regionsZones } from './regions-zones'
import { ownershipTree } from './ownership-tree'
import { resourceManager } from './resource-manager'
import { firstRequest } from './first-request'
import { costLifecycle } from './cost-lifecycle'

// One bundle per course folder, spread into src/scenes/index.ts.
export const foundationsScenes: Scene[] = [operatingModels, regionsZones, ownershipTree, resourceManager, firstRequest, costLifecycle]
