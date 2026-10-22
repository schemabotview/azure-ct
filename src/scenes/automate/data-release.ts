import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'

// Data Factory CI/CD: only the development factory is connected to Git; a build (the
// @microsoft/azure-data-factory-utilities npm package) turns the collaboration branch into an ARM
// template, and test and production factories are deployed from it, never edited. Triggers are
// stopped before the deployment and started after it (Microsoft's pre/post-deployment script).
// A Databricks asset bundle (databricks.yml) declares jobs and their targets; `databricks bundle
// deploy --target <name>` deploys them. The data code arrives in Courses 8 and 10; this card is the
// shape the release takes, so it is model-checked (actionlint), not replayed.
// source: https://learn.microsoft.com/en-us/azure/data-factory/continuous-integration-delivery
// source: https://learn.microsoft.com/en-us/azure/data-factory/continuous-integration-delivery-improvements
// source: https://learn.microsoft.com/en-us/azure/data-factory/continuous-integration-delivery-sample-script
// source: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/bundles/
const steps = `# The release once the data code exists: the order of the steps is the point.
name: release
on:
  workflow_call:
    inputs:
      env: { type: string, required: true }
permissions:
  id-token: write
  contents: read
jobs:
  release:
    runs-on: ubuntu-latest
    environment: \${{ inputs.env }}
    env:
      DATABRICKS_HOST: \${{ vars.DATABRICKS_HOST }}
      DATABRICKS_AUTH_TYPE: azure-cli   # the same Entra ID sign-in
    steps:
      - uses: actions/checkout@v5
      - uses: azure/login@v2
        with:
          client-id: \${{ vars.AZURE_CLIENT_ID }}
          tenant-id: \${{ vars.AZURE_TENANT_ID }}
          subscription-id: \${{ vars.AZURE_SUBSCRIPTION_ID }}
      - run: infra/06-deploy.sh \${{ inputs.env }}       # 1. what it all runs on
      - uses: databricks/setup-cli@main
      - run: databricks bundle deploy --target \${{ inputs.env }}  # 2. the jobs
      - run: adf/release.sh \${{ inputs.env }}  # 3. stop triggers, deploy, start`

export const dataRelease: Scene = mapFrame('data-release', BUILT_BY[6], {
  id: 'data-release-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'release-data', kind: 'code', filename: 'release.yml · model-checked', label: steps, highlight: [24, 26, 27], pattern: 'service' },
    {
      id: 'release-order',
      kind: 'table',
      label: 'Why this order',
      headers: ['step', 'it needs'],
      values: [
        ['1. infrastructure', 'nothing: everything lives in it'],
        ['2. Databricks jobs', 'the workspace and the lake'],
        ['3. Data Factory', 'the jobs its pipelines start'],
      ],
    },
    {
      id: 'adf-git',
      kind: 'list',
      icon: 'datafactory',
      label: 'Data Factory from its git branch',
      pattern: 'service',
      items: [
        'Only the dev factory is connected to git',
        'A build turns main into an ARM template',
        'Test and prod are deployed, never edited',
        'Triggers stop for the deployment, then start',
      ],
    },
  ],
})
