import type { Course } from '../types'
import { signInAndMfa } from './01-sign-in-and-mfa'
import { appRegistrationsAndTokens } from './02-app-registrations-and-tokens'
import { managedIdentities } from './03-managed-identities'
import { rbacRolesAndScopes } from './04-rbac-roles-and-scopes'
import { controlAndDataPlaneAccess } from './05-control-and-data-plane-access'
import { azurePolicy } from './06-azure-policy'
import { managementGroupsAndEnvironments } from './07-management-groups-and-environments'
import { privilegedAccessAndGovernance } from './08-privileged-access-and-governance'

// Chapter 2 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch02IdentityGovernance: Course = {
  id: 'ch02-identity-governance',
  title: 'Identity, Access, and Governance',
  sections: [
    signInAndMfa,
    appRegistrationsAndTokens,
    managedIdentities,
    rbacRolesAndScopes,
    controlAndDataPlaneAccess,
    azurePolicy,
    managementGroupsAndEnvironments,
    privilegedAccessAndGovernance,
  ],
}
