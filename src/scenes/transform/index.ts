import type { Scene } from '@graphlearning/flow'
import { workspace } from './workspace'
import { network } from './network'
import { lake } from './lake'
import { secrets } from './secrets'
import { compute } from './compute'
import { orchestrate } from './orchestrate'
import { cost } from './cost'

export const transformScenes: Scene[] = [workspace, network, lake, secrets, compute, orchestrate, cost]
