import type { Scene } from '@graphlearning/flow'
import { why } from './why'
import { hubs } from './hubs'
import { kafka } from './kafka'
import { checkpoints } from './checkpoints'
import { capture } from './capture'
import { fourways } from './fourways'
import { dealsteps } from './dealsteps'
import { rules } from './rules'

export const streamScenes: Scene[] = [why, hubs, kafka, checkpoints, capture, fourways, dealsteps, rules]
