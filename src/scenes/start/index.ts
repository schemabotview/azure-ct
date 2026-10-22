import type { Scene } from '@graphlearning/flow'
import { tour } from './tour'
import { breakGlass } from './break-glass'
import { firstSession } from './first-session'
import { emulators } from './emulators'
import { firstResources } from './first-resources'
import { cleanup } from './cleanup'

export const startScenes: Scene[] = [tour, breakGlass, firstSession, emulators, firstResources, cleanup]
