import type { Scene } from '@graphlearning/flow'
import { dataModels } from './data-models'
import { sqlFamily } from './sql-family'
import { managedRelational } from './managed-relational'
import { transactions } from './transactions'
import { availability } from './availability'
import { cosmosPartitions } from './cosmos-partitions'
import { cosmosConsistency } from './cosmos-consistency'
import { caching } from './caching'

// One bundle per course folder, spread into src/scenes/index.ts.
export const ch07Scenes: Scene[] = [dataModels, sqlFamily, managedRelational, transactions, availability, cosmosPartitions, cosmosConsistency, caching]
