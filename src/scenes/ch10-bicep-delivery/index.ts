import type { Scene } from '@graphlearning/flow'
import { bicepBasics } from './bicep-basics'
import { modulesScopes } from './modules-scopes'
import { parametersSecrets } from './parameters-secrets'
import { whatIf } from './what-if'
import { cicdIdentity } from './cicd-identity'
import { schemaRollback } from './schema-rollback'
import { promotion } from './promotion'

// One bundle per course folder, spread into src/scenes/index.ts.
export const ch10Scenes: Scene[] = [bicepBasics, modulesScopes, parametersSecrets, whatIf, cicdIdentity, schemaRollback, promotion]
