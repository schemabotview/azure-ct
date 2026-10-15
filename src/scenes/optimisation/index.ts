import type { Scene } from '@graphlearning/flow'
import { latency } from './latency'
import { edgeCaching } from './edge-caching'
import { costScopes } from './cost-scopes'
import { rightsizing } from './rightsizing'
import { architectureCompare } from './architecture-compare'
import { migrationAdr } from './migration-adr'
import { wafReview } from './waf-review'

// One bundle per course folder, spread into src/scenes/index.ts.
export const optimisationScenes: Scene[] = [latency, edgeCaching, costScopes, rightsizing, architectureCompare, migrationAdr, wafReview]
