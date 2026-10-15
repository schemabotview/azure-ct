import type { Scene } from '@graphlearning/flow'
import { requestPath } from './request-path'
import { plansApps } from './plans-apps'
import { deployment } from './deployment'
import { keyVaultReference } from './key-vault-reference'
import { healthScale } from './health-scale'
import { slots } from './slots'

// One bundle per course folder, spread into src/scenes/index.ts.
export const appServiceScenes: Scene[] = [requestPath, plansApps, deployment, keyVaultReference, healthScale, slots]
