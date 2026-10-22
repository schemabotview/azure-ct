import type { Scene } from '@graphlearning/flow'
import { riskQuestion } from './risk-question'
import { fiveSources } from './five-sources'
import { overnightBurst } from './overnight-burst'
import { managed } from './managed'
import { responsibility } from './responsibility'
import { build } from './build'

export const whyCloudScenes: Scene[] = [riskQuestion, fiveSources, overnightBurst, managed, responsibility, build]
