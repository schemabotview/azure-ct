import type { Section } from '../types'

// Ch3 §4. Reference: App Service Key Vault references; managed identities for App Service; Key Vault RBAC roles.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the reference syntax, the role name (Key Vault Secrets User), and the behaviour when a reference cannot be resolved.
export const managedIdentityAndKeyVaultReferences: Section = {
  id: 'managed-identity-and-key-vault-references',
  title: 'Managed identity and Key Vault references',
  scene: 'key-vault-reference',
  focus: 'identity',
  slide: `## Secrets without storing them

### Key Vault reference
- An app setting holds a **pointer**, not the secret
- The platform resolves it with the app's **managed identity**
- Your code reads an ordinary **environment variable**

### Two things must be right
- The identity needs a **role** on the vault
- The vault must be **reachable** from the app

### When it fails
- The app may see the **reference text** instead of the value
- Check the reference's status in the portal

### Boundaries
- Anyone who can read the app's **process or settings** may reach the value
- Prefer **identity-based access** to data, so there is no secret at all`,
  narration:
    "Some settings are secrets, such as a database password, and we do not want them sitting in our settings in plain text. A Key Vault reference helps. Instead of the password, the app setting holds a pointer to a secret in Key Vault. When the app starts, the App Service platform resolves the pointer for us, using the app's managed identity, which we met in the last chapter. The application never knows any of this. It just reads an ordinary environment variable. Two things have to be right for that to work. The identity needs a role on the vault, such as the one that lets it read secrets, and the vault has to be reachable from the app. If either fails, the app may receive the reference text itself instead of the secret, which produces a confusing error, so the portal's reference status is the first place to look. Be clear about the boundary, too. Anyone who can read the running process, or the settings, may be able to reach the value. The strongest answer is to avoid the secret altogether, by letting the identity access storage or databases directly. Next, how do we see what the app is doing?",
}
