import type { Scene } from '@graphlearning/flow'
import { regions } from './regions'
import { ownership } from './ownership'
import { arm } from './arm'
import { anatomy } from './anatomy'
import { resourceIds } from './resource-ids'
import { charging } from './charging'

export const howAzureRunsScenes: Scene[] = [regions, ownership, arm, anatomy, resourceIds, charging]
