import type { Scene } from '@graphlearning/flow'
import { measure } from './measure'
import { frontdoor } from './frontdoor'
import { cost } from './cost'
import { commit } from './commit'
import { footprint } from './footprint'
import { fourways } from './fourways'
import { adr } from './adr'
import { region } from './region'
import { review } from './review'

export const evolveScenes: Scene[] = [measure, frontdoor, cost, commit, footprint, fourways, adr, region, review]
