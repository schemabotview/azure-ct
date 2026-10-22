import type { Scene } from '@graphlearning/flow'
import { api } from './api'
import { appservice } from './appservice'
import { settings } from './settings'
import { release } from './release'
import { otherways } from './otherways'
import { door } from './door'
import { alerts } from './alerts'
import { workflow } from './workflow'
import { filer } from './filer'

export const publishScenes: Scene[] = [api, appservice, settings, release, otherways, door, alerts, workflow, filer]
