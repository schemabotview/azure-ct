import type { Scene } from '@graphlearning/flow'

// Ch10 §5 — workload identity federation lets a pipeline sign in without a stored secret: the CI
// provider issues a short-lived token that Entra trusts for a named subject. One identity per
// environment, each scoped to its own resource group. Syntax is GitHub Actions; IDs are placeholders.
export const cicdIdentity: Scene = {
  id: 'cicd-identity',
  title: 'A pipeline that holds no secret',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'workflow',
      kind: 'code',
      filename: '.github/workflows/deploy.yml (trimmed)',
      label: `permissions: { id-token: write, contents: read }
steps:
  - uses: azure/login@v2
    with:
      client-id: \${{ vars.AZURE_CLIENT_ID }}
      tenant-id: \${{ vars.AZURE_TENANT_ID }}
      subscription-id: \${{ vars.AZURE_SUBSCRIPTION_ID }}
  - run: az deployment group create ...`,
    },
    {
      id: 'trust',
      label: 'The trust relationship',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ci', label: 'CI provider', sub: 'issues a short-lived token', pattern: 'external', icon: 'devops' },
        { id: 'fed', label: 'Federated credential', sub: 'trusts one repo and environment', pattern: 'user', icon: 'appregistration' },
        { id: 'azure', label: 'Azure access token', sub: 'for that identity only', pattern: 'service', icon: 'key' },
      ],
    },
    {
      id: 'envs',
      kind: 'table',
      label: 'One deployment identity per environment',
      headers: ['Environment', 'Identity', 'Role scope'],
      values: [
        ['development', 'id-deploy-dev', 'rg-retail-dev'],
        ['production', 'id-deploy-prod', 'rg-retail-prod'],
      ],
    },
  ],
  edges: [
    { source: 'workflow', target: 'trust', label: 'signs in through' },
    { source: 'trust', target: 'envs', label: 'one per' },
  ],
}
