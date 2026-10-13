import type { Section } from '../types'

// Ch11 §5. Reference: Azure Key Vault overview; secret rotation guidance; customer-managed keys for encryption at rest.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm how quickly App Service Key Vault references and SDK clients pick up a rotated secret, and soft-delete and purge-protection defaults.
export const keyVaultKeysAndSecretRotation: Section = {
  id: 'key-vault-keys-and-secret-rotation',
  title: 'Key Vault, encryption keys, secret rotation and access dependencies',
  scene: 'ch11-key-vault-rotation',
  focus: 'timeline',
  slide: `## Keeping secrets alive and safe

### What the vault holds
- **Secrets**, **keys** and **certificates**
- Access by **RBAC**, logged

### Rotation
- Change the **credential at the source**, then update the vault
- Make sure consumers **re-read** it
- A wrong order or a **cached value** causes an outage

### Dependencies
- If the vault is **unreachable at startup**, the app may not start
- A **disabled customer-managed key** makes data **unreadable**

### Protection
- Turn on **soft delete** and **purge protection**
- **Monitor** access and failures`,
  narration:
    "Key Vault stores secrets, encryption keys and certificates, with access controlled by role assignments and every access logged. The hard part is not storing a secret, it is changing one without breaking things. Look at the timeline in the table. We rotate a database password. At step one the database now rejects the old value. At step two the app still holds the old secret, so logins fail. At step three the vault has the new secret, but the app has not re-read it. Only at step four, when the app picks up the vault's new value, does it recover. The lesson is to plan the order, and to make sure consumers re-read the secret instead of caching it forever. Rotation is a practised procedure, not an emergency improvisation. Now see that the vault itself becomes a dependency. If it is unreachable when an app starts, the app may not start. And if you use a customer-managed encryption key, disabling that key makes the encrypted data unreadable, by design. So turn on soft delete and purge protection, and monitor access and failures. Beyond secrets, who watches for attacks?",
}
