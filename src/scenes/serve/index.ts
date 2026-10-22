import type { Scene } from '@graphlearning/flow'
import { needs } from './needs'
import { relational } from './relational'
import { mart } from './mart'
import { reserve } from './reserve'
import { retry } from './retry'
import { lookup } from './lookup'
import { update } from './update'
import { cache } from './cache'
import { move } from './move'

export const serveScenes: Scene[] = [needs, relational, mart, reserve, retry, lookup, update, cache, move]
