import type { Course } from '../types'
import { armAndBicep } from './01-arm-and-bicep'
import { resourcesModulesAndScopes } from './02-resources-modules-and-scopes'
import { parametersOutputsAndSecrets } from './03-parameters-outputs-and-secrets'
import { whatIfDriftAndDeletion } from './04-what-if-drift-and-deletion'
import { ciCdIdentitiesAndWorkloadFederation } from './05-ci-cd-identities-and-workload-federation'
import { slotsCanariesRollbackAndSchema } from './06-slots-canaries-rollback-and-schema'
import { environmentPromotionProvenanceAndTerraform } from './07-environment-promotion-provenance-and-terraform'

// Chapter 10 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch10BicepDelivery: Course = {
  id: 'ch10-bicep-delivery',
  title: 'Infrastructure and Software Delivery',
  sections: [
    armAndBicep,
    resourcesModulesAndScopes,
    parametersOutputsAndSecrets,
    whatIfDriftAndDeletion,
    ciCdIdentitiesAndWorkloadFederation,
    slotsCanariesRollbackAndSchema,
    environmentPromotionProvenanceAndTerraform,
  ],
}
