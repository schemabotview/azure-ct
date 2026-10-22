import type { Section } from '../types'

export const settingsWithoutSecrets: Section = {
  id: 'settings-without-secrets',
  title: 'Settings without secrets',
  scene: 'settings-without-secrets',
  narration:
    "An application's settings are where secrets usually leak: into a template, a repository, a screenshot. The editor shows the app's settings in app dot bicep. Key Vault references are read as the user assigned identity, i d w g exposure prod. The mart's host and database name are plain configuration. AZURE CLIENT I D tells the A P I which of its identities to sign in as. And the last setting, the limits service key, is not a value at all: it is a Key Vault reference, naming the vault and a secret called limits key. The terminal runs tools slash settings check dot py, which compiles the template and classifies every setting. Three are configuration. One is a Key Vault reference, read at startup. None is a secret written into the template, which the check would flag in capitals. And references are read as the app's identity. The table on the right explains why only one secret is left. The risk mart, the group lookup and the cache all accept Entra I D tokens, so the A P I signs in to each as its own identity, and there is nothing to store. Only the bank's limits system, on premises, accepts nothing but an A P I key, so that key lives in Key Vault, and app slash limits dot p y reads it from the environment. The list underneath is how a reference works. The setting names the secret, not its value. App Service reads it as i d w g exposure prod, which needs the Key Vault Secrets User role on the vault. And when the secret is rotated in Key Vault, App Service picks up the new value without a redeployment. Next, releasing a new version without anyone noticing.",
}
