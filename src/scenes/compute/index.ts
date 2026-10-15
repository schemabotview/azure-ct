import type { Scene } from '@graphlearning/flow'
import { computeDecision } from './compute-decision'
import { vm } from './vm'
import { scaleSet } from './scale-set'
import { images } from './images'
import { containerApps } from './container-apps'
import { aks } from './aks'
import { autoscaling } from './autoscaling'

// One bundle per course folder, spread into src/scenes/index.ts.
export const computeScenes: Scene[] = [computeDecision, vm, scaleSet, images, containerApps, aks, autoscaling]
