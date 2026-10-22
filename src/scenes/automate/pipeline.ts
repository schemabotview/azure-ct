import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { automateTree } from './tree'
import code from '../../../spine/automate/06-pipeline/project/.github/workflows/release.yml?raw'
import session from '../../../spine/automate/06-pipeline/session.txt?raw'

// Workload identity federation: an app registration trusts tokens from an external issuer (GitHub's
// OIDC provider) whose issuer, subject and audience match one of its federated credentials, so no
// client secret exists. A GitHub job gets a token only with `permissions: id-token: write`; a job
// that names an environment gets the subject repo:<owner>/<repo>:environment:<name>, and an
// environment can require a reviewer. A credential's subject must match exactly.
// source: https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation
// source: https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect
// source: https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect
export const pipeline: Scene = ideFrame(
  'pipeline-identity',
  'risk-on-azure',
  automateTree('06', '.github/workflows/release.yml', ['.github/', 'infra/06-federation.sh', 'tools/oidc_subject.py'], ['budgets', 'infra', 'policies', 'templates']),
  { file: '.github/workflows/release.yml', code, show: [[10, 25]], highlight: [11, 17, 20, 21, 22], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'pipeline-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'secret-or-not',
        kind: 'table',
        label: 'Signing the pipeline in',
        headers: ['', 'secret', 'federated'],
        values: [
          ['stored', 'in GitHub', 'nothing'],
          ['lasts', 'until rotated', 'minutes'],
          ['if leaked', 'works anywhere', 'one token'],
          ['usable by', 'its holder', 'one env'],
        ],
      },
      {
        id: 'deploy-ids',
        kind: 'list',
        icon: 'managedidentity',
        label: 'Two deployment identities',
        pattern: 'user',
        items: [
          'risk-deploy-dev: Contributor on risk-dev',
          'risk-deploy-prod: Contributor on risk-prod',
          'Each trusts one GitHub environment',
          'prod’s environment needs a reviewer',
        ],
      },
    ],
  },
)
