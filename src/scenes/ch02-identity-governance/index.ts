import type { Scene } from '@graphlearning/flow'
import { signIn } from './sign-in'
import { appToken } from './app-token'
import { managedIdentity } from './managed-identity'
import { rbac } from './rbac'
import { controlDataPlane } from './control-data-plane'
import { policy } from './policy'
import { managementGroups } from './management-groups'
import { privilegedAccess } from './privileged-access'

// One bundle per course folder, spread into src/scenes/index.ts.
export const ch02Scenes: Scene[] = [signIn, appToken, managedIdentity, rbac, controlDataPlane, policy, managementGroups, privilegedAccess]
