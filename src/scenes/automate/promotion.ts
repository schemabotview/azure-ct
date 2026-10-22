import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import workflow from '../../../spine/automate/08-promotion/project/.github/workflows/deploy.yml?raw'
import session from '../../../spine/automate/08-promotion/session.txt?raw'

// Build once, deploy the same files to each environment: the build job compiles the template and both
// parameter files and uploads them as one workflow artifact; each release job downloads it, checks the
// checksums and deploys it under a name carrying the commit, so the deployment history says which
// commit produced the environment. Terraform describes the same resources with its own state file;
// Bicep keeps none (Resource Manager is the state) and supports new API versions on release.
// source: https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-history
// source: https://learn.microsoft.com/en-us/azure/developer/terraform/comparing-terraform-and-bicep
export const promotion: Scene = mapFrame('promotion', BUILT_BY[6], {
  id: 'promotion-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'promotion-workflow', kind: 'code', filename: '.github/workflows/deploy.yml', label: workflow.replace(/\n+$/, ''), highlight: [9, 13, 14, 17, 21], pattern: 'service' },
    { id: 'promotion-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · the build', label: session.replace(/\n+$/, '') },
    {
      id: 'bicep-terraform',
      kind: 'table',
      label: 'Where Terraform fits',
      headers: ['', 'Bicep', 'Terraform'],
      values: [
        ['clouds', 'Azure only', 'many, one language'],
        ['state', 'none: Azure is it', 'a state file to keep'],
        ['new Azure APIs', 'on release day', 'AzAPI at once, AzureRM later'],
        ['preview', 'what-if', 'plan'],
      ],
    },
  ],
})
