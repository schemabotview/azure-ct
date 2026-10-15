import type { Scene } from '@graphlearning/flow'
import { signals } from './signals'
import { kql } from './kql'
import { diagnostics } from './diagnostics'
import { sloAlerts } from './slo-alerts'
import { keyVaultRotation } from './key-vault-rotation'
import { securityServices } from './security-services'
import { incident } from './incident'
import { backup } from './backup'
import { rtoRpo } from './rto-rpo'
import { resilience } from './resilience'

// One bundle per course folder, spread into src/scenes/index.ts.
export const operationsScenes: Scene[] = [signals, kql, diagnostics, sloAlerts, keyVaultRotation, securityServices, incident, backup, rtoRpo, resilience]
