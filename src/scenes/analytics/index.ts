import type { Scene } from '@graphlearning/flow'
import { oltpOlap } from './oltp-olap'
import { ingestion } from './ingestion'
import { lakeLayout } from './lake-layout'
import { dataFactory } from './data-factory'
import { productChoice } from './product-choice'
import { streaming } from './streaming'

// One bundle per course folder, spread into src/scenes/index.ts.
export const analyticsScenes: Scene[] = [oltpOlap, ingestion, lakeLayout, dataFactory, productChoice, streaming]
