import type { Scene } from '@graphlearning/flow'
import { people } from './people'
import { tokens } from './tokens'
import { identities } from './identities'
import { roles } from './roles'
import { planes } from './planes'
import { policy } from './policy'
import { environments } from './environments'
import { privileged } from './privileged'

export const secureScenes: Scene[] = [people, tokens, identities, roles, planes, policy, environments, privileged]
