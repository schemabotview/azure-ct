import type { Course } from '../types'
import { theWorkspaceAsAnAzureResource } from './01-the-workspace-as-an-azure-resource'
import { databricksInTheNetwork } from './02-databricks-in-the-network'
import { reachingTheLake } from './03-reaching-the-lake'
import { secretsAndPeople } from './04-secrets-and-people'
import { computeOnTheAzureBill } from './05-compute-on-the-azure-bill'
import { whoStartsTheJob } from './06-who-starts-the-job'
import { whatANightCosts } from './07-what-a-night-costs'

// Course 10 — Transform it in Databricks, the Azure side: the workspace as a resource, its
// network, its identity on the lake, secrets and people, compute and quotas, orchestration, cost.
export const transform: Course = {
  id: 'transform',
  title: 'Transform it in Databricks',
  sections: [
    theWorkspaceAsAnAzureResource,
    databricksInTheNetwork,
    reachingTheLake,
    secretsAndPeople,
    computeOnTheAzureBill,
    whoStartsTheJob,
    whatANightCosts,
  ],
}
