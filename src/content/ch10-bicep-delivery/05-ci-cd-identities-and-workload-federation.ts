import type { Section } from '../types'

// Ch10 §5. Reference: Workload identity federation with GitHub Actions; azure/login action; Azure RBAC for deployment identities.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm action versions, the federated-credential subject format for environments, and the minimum role needed to deploy.
export const ciCdIdentitiesAndWorkloadFederation: Section = {
  id: 'ci-cd-identities-and-workload-federation',
  title: 'CI/CD artefacts, deployment identities and workload identity federation',
  scene: 'ch10-cicd-identity',
  focus: 'trust',
  slide: `## A pipeline with no stored secret

### The old problem
- A **client secret** in CI settings is a credential to **leak** and rotate

### Workload identity federation
- The CI provider issues a **short-lived token**
- Entra **trusts** it for one named **repository and environment**
- Azure returns an **access token**; nothing long-lived is stored

### Least privilege
- **One identity per environment**
- Each has a role only on **its own resource group**

### The flow
- **What-if** on the pull request
- **Deploy** only after merge and approval

### Check
- The trust names the **exact subject**, not a wildcard`,
  narration:
    "Someone, or something, has to run these deployments, and giving a pipeline a stored client secret is a liability. If it leaks, an attacker can deploy as you, and it must be rotated forever. Workload identity federation removes the secret. Look at the trust relationship in the diagram. The CI provider, here GitHub, issues a short-lived token to the running job. Entra has a federated credential that trusts tokens from one specific repository and environment. The pipeline exchanges the token for an Azure access token for a particular identity, and nothing long-lived is ever stored. The workflow in the card shows how little it needs: permission to request the token, and a login step with three identifiers, none of which is a secret. Apply least privilege on top. Use one deployment identity per environment, and give each a role only on its own resource group, so the development identity cannot touch production. Run what-if on the pull request, and deploy only after merge and approval. And check that the federated credential names the exact subject, not a wildcard. Deploying infrastructure is one thing, but releasing software safely has its own risks.",
}
