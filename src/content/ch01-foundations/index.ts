import type { Course } from '../types'
import { operatingModels } from './01-operating-models'
import { regionsZones } from './02-regions-zones'
import { tenantSubscriptionResourceGroup } from './03-tenant-subscription-resource-group'
import { resourceManagerSection } from './04-resource-manager'
import { firstRequestAndResourceId } from './05-first-request-and-resource-id'
import { costTagsCleanup } from './06-cost-tags-cleanup'

// Chapter 1 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch01Foundations: Course = {
  id: 'ch01-foundations',
  title: 'Azure Foundations and Resource Ownership',
  sections: [
    operatingModels,
    regionsZones,
    tenantSubscriptionResourceGroup,
    resourceManagerSection,
    firstRequestAndResourceId,
    costTagsCleanup,
  ],
}
