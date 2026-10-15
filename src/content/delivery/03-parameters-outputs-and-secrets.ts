import type { Section } from '../types'

// Ch10 §3. Reference: Bicep parameters and parameter files; secure parameters; Key Vault secret references; outputs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm az.getSecret syntax in .bicepparam files and the secure-parameter options for the chosen Bicep version.
export const parametersOutputsAndSecrets: Section = {
  id: 'parameters-outputs-and-secrets',
  title: 'Parameters, outputs, configuration and secret references',
  scene: 'parameters-secrets',
  focus: 'where',
  slide: `## One template, many environments

### Parameter files
- Values that **differ per environment** go in a parameter file
- Names, SKUs, sizes and flags

### Secrets
- **Never** write a secret in a template or parameter file
- Fetch it from **Key Vault** at deployment time
- Mark the parameter **secure**

### Outputs
- Return **IDs and names** others need
- **Never** output a secret: logs print outputs

### Reviewing
- Search the diff for **keys and tokens**
- Treat **build logs** as public`,
  narration:
    "One template should serve every environment, so the parts that differ go into parameters. A parameter file, like the one in the card, sets the app name and the tier for development. Production gets its own file with its own values. Secrets need extra care, and here is the rule. A secret is never written into a template or a parameter file. The card shows the alternative: the password parameter is fetched from Key Vault at deployment time, by reference, and the parameter is marked secure. The table sums up where each kind of value belongs. Names and sizes go in the parameter file. A secret goes in Key Vault, and is referenced. An identifier that other deployments need can be an output. Outputs deserve caution, because deployment logs print them. So never output a secret, and treat build logs as if they were public. Make it part of review. Search the diff for keys and tokens, and check what the outputs reveal. With a template written, how do we know what a change will do before we run it?",
}
