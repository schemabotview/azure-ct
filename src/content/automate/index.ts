import type { Course } from '../types'
import { whenTheScriptsStopScaling } from './01-when-the-scripts-stop-scaling'
import { bicepAndArm } from './02-bicep-and-arm'
import { modulesReferencesAndScopes } from './03-modules-references-and-scopes'
import { parametersOutputsAndSecrets } from './04-parameters-outputs-and-secrets'
import { whatIfDriftAndReplacement } from './05-what-if-drift-and-replacement'
import { aPipelineWithNoStoredSecret } from './06-a-pipeline-with-no-stored-secret'
import { releasingDataCode } from './07-releasing-data-code'
import { oneArtefactTwoEnvironments } from './08-one-artefact-two-environments'

// Course 6 — Make it repeatable. The scripts' limits, Bicep and ARM, modules and scopes, parameters
// and a Key Vault reference, what-if, a federated pipeline, data code's release order, and promotion.
export const automate: Course = {
  id: 'automate',
  title: 'Make it repeatable',
  sections: [
    whenTheScriptsStopScaling,
    bicepAndArm,
    modulesReferencesAndScopes,
    parametersOutputsAndSecrets,
    whatIfDriftAndReplacement,
    aPipelineWithNoStoredSecret,
    releasingDataCode,
    oneArtefactTwoEnvironments,
  ],
}
