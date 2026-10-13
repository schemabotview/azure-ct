import type { Section } from '../types'

// Ch10 §7. Reference: Software supply-chain provenance concepts; Terraform on Azure; Bicep versus Terraform comparison.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current Bicep and Terraform differences (state handling, resource coverage) before recommending either.
export const environmentPromotionProvenanceAndTerraform: Section = {
  id: 'environment-promotion-provenance-and-terraform',
  title: 'Environment promotion, provenance and Terraform selection boundaries',
  scene: 'ch10-promotion',
  focus: 'compare',
  slide: `## Build once, promote, prove

### Promotion
- **Build once**, then deploy the **same artefact** to each environment
- Only **parameters** change between environments
- **Approval** gates production

### Provenance
- Record **who built what**, from which **commit**
- Keep the **digest** of what is running
- Lets you answer "what is in production?"

### Bicep or Terraform
- **Bicep**: Azure only, no state file to protect
- **Terraform**: many providers, a **state file** to secure
- Choose for **team skills and scope**, not fashion

### Boundary
- Mixing both without a clear **split** causes conflicts`,
  narration:
    "The last delivery principle is to build once and promote. The pipeline builds the application a single time and records the result as an artefact, with an image digest and the commit it came from. That same artefact goes to development, then to test, then to production, with only the parameters changing. Production waits for an approval. Because you never rebuild for production, what you tested is what you ship. Alongside that, record provenance: who built what, from which commit, and the digest of what is running, so you can answer the question what is in production right now. Finally, a word on tools. Bicep is Azure-only and Azure tracks the state of your deployments, so there is no state file to protect. Terraform covers many providers, and uses a state file that you must secure and back up. Neither is better in the abstract. Choose for your team's skills and scope, and if you use both, split responsibilities clearly so they do not fight over the same resources. The delivery is now reproducible. Next, how do we see and recover what we have built?",
}
