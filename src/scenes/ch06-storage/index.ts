import type { Scene } from '@graphlearning/flow'
import { storageKinds } from './storage-kinds'
import { blobBasics } from './blob-basics'
import { accessMethods } from './access-methods'
import { concurrency } from './concurrency'
import { protection } from './protection'
import { filesDisks } from './files-disks'
import { redundancy } from './redundancy'

// One bundle per course folder, spread into src/scenes/index.ts.
export const ch06Scenes: Scene[] = [storageKinds, blobBasics, accessMethods, concurrency, protection, filesDisks, redundancy]
