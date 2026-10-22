import type { Scene } from '@graphlearning/flow'
import { kinds } from './kinds'
import { lake } from './lake'
import { drop } from './drop'
import { twice } from './twice'
import { lifecycle } from './lifecycle'
import { reports } from './reports'
import { share } from './share'
import { redundancy } from './redundancy'

export const landScenes: Scene[] = [kinds, lake, drop, twice, lifecycle, reports, share, redundancy]
