import type { Course } from '../types'
import { peopleAndSignIn } from './01-people-and-sign-in'
import { applicationsAndTokens } from './02-applications-and-tokens'
import { managedIdentities } from './03-managed-identities'
import { roleBasedAccess } from './04-role-based-access'
import { controlPlaneAndDataPlane } from './05-control-plane-and-data-plane'
import { azurePolicy } from './06-azure-policy'
import { managementGroupsAndEnvironments } from './07-management-groups-and-environments'
import { privilegedAccessAndAudit } from './08-privileged-access-and-audit'

// Course 4 — Lock it down. People, applications and workloads get identities; roles, scopes,
// Policy and management groups decide what each may do; privileged access is time-bound and audited.
export const secure: Course = {
  id: 'secure',
  title: 'Lock it down',
  sections: [
    peopleAndSignIn,
    applicationsAndTokens,
    managedIdentities,
    roleBasedAccess,
    controlPlaneAndDataPlane,
    azurePolicy,
    managementGroupsAndEnvironments,
    privilegedAccessAndAudit,
  ],
}
