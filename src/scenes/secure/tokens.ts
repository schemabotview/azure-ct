import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { secureTree } from './tree'
import code from '../../../spine/secure/02-tokens/project/tools/token_claims.py?raw'
import session from '../../../spine/secure/02-tokens/session.txt?raw'

// An app registration is the application object (the definition, in its home tenant); a service
// principal is its instance in a tenant, the identity that is granted access. An access token is a
// signed JWT: aud (audience), iss, tid, oid, scp for delegated permissions, roles for app
// permissions; the resource validates the signature with Entra's published keys. The token here is
// made locally with those claims and a local key, and the frame says so.
// source: https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals
// source: https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference
export const tokens: Scene = ideFrame(
  'app-tokens',
  'risk-on-azure',
  secureTree('02', 'tools/token_claims.py', ['tools/token_claims.py', 'infra/04-app.sh'], ['budgets', 'infra']),
  { file: 'tools/token_claims.py', code, show: [[11, 21], [30, 33]], highlight: [12, 17, 30, 32], terminal: session, emulated: false },
  {
    id: 'tokens-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'objects',
        kind: 'table',
        label: 'infra/04-app.sh makes two things',
        headers: ['object', 'is'],
        values: [
          ['application', 'the definition: Exposure API'],
          ['service principal', 'its identity in the tenant'],
          ['api://exposure-api', 'its name in tokens (aud)'],
        ],
      },
      {
        id: 'claims',
        kind: 'table',
        label: 'Claims an API must check',
        headers: ['claim', 'check'],
        values: [
          ['signature', 'Entra’s published key'],
          ['aud', 'it is for me'],
          ['iss, tid', 'Woodgrove’s tenant'],
          ['exp', 'not expired'],
          ['scp or roles', 'allowed to do this'],
        ],
      },
      {
        id: 'local',
        kind: 'list',
        icon: 'circleslash',
        label: 'Made here, not by Entra',
        pattern: 'warn',
        items: ['Same claims, a local key', 'No tenant behind it', 'The checks are the real library’s'],
      },
    ],
  },
)
