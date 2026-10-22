import type { Course } from '../types'
import { regionsAndAvailabilityZones } from './01-regions-and-availability-zones'
import { tenantManagementGroupsSubscriptionsAndResourceGroups } from './02-tenant-management-groups-subscriptions-and-resource-groups'
import { everyActionIsAnArmRequest } from './03-every-action-is-an-arm-request'
import { anatomyOfARequest } from './04-anatomy-of-a-request'
import { resourceIdsAndNaming } from './05-resource-ids-and-naming'
import { whatKeepsCharging } from './06-what-keeps-charging'

// Course 2 — How Azure runs a request. Where the platform will live, who owns and pays for it, how
// every change reaches Resource Manager, one request taken apart, names, and what keeps billing.
export const howAzureRuns: Course = {
  id: 'how-azure-runs',
  title: 'How Azure runs a request',
  sections: [
    regionsAndAvailabilityZones,
    tenantManagementGroupsSubscriptionsAndResourceGroups,
    everyActionIsAnArmRequest,
    anatomyOfARequest,
    resourceIdsAndNaming,
    whatKeepsCharging,
  ],
}
