import type { Scene } from '@graphlearning/flow'
import { parts } from './parts'
import { runtime } from './runtime'
import { copy } from './copy'
import { arrive } from './arrive'
import { contract } from './contract'
import { reconcile } from './reconcile'
import { rerun } from './rerun'
import { secrets } from './secrets'

export const batchScenes: Scene[] = [parts, runtime, copy, arrive, contract, reconcile, rerun, secrets]
