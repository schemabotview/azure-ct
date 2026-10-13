import type { Course } from '../types'
import { httpRequestsAndProcesses } from './01-http-requests-and-processes'
import { appServicePlansAndApps } from './02-app-service-plans-and-apps'
import { deploymentStartupAndConfiguration } from './03-deployment-startup-and-configuration'
import { managedIdentityAndKeyVaultReferences } from './04-managed-identity-and-key-vault-references'
import { logsHealthChecksAndScaling } from './05-logs-health-checks-and-scaling'
import { deploymentSlotsAndHostingResponsibilities } from './06-deployment-slots-and-hosting-responsibilities'

// Chapter 3 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch03AppService: Course = {
  id: 'ch03-app-service',
  title: 'A First Managed Application',
  sections: [
    httpRequestsAndProcesses,
    appServicePlansAndApps,
    deploymentStartupAndConfiguration,
    managedIdentityAndKeyVaultReferences,
    logsHealthChecksAndScaling,
    deploymentSlotsAndHostingResponsibilities,
  ],
}
