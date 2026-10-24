import type { Scene } from '@graphlearning/flow'
import { telemetry } from './telemetry'
import { kql } from './kql'
import { logs } from './logs'
import { objective } from './objective'
import { rotation } from './rotation'
import { detect } from './detect'
import { incident } from './incident'
import { backup } from './backup'
import { recovery } from './recovery'
import { throttling } from './throttling'

export const operateScenes: Scene[] = [telemetry, kql, logs, objective, rotation, detect, incident, backup, recovery, throttling]
