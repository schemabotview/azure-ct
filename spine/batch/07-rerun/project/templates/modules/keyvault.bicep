// The platform's vault: access by Azure roles, purge protection on, no
// public network access, and open to deployments that reference a secret.
param location string = resourceGroup().location
param name string

resource vault 'Microsoft.KeyVault/vaults@2025-05-01' = {
  name: name
  location: location
  properties: {
    tenantId: tenant().tenantId
    sku: { family: 'A', name: 'standard' }
    enableRbacAuthorization: true
    enablePurgeProtection: true
    enabledForTemplateDeployment: true
    softDeleteRetentionInDays: 90
    publicNetworkAccess: 'Disabled'
  }
}

output vaultUri string = vault.properties.vaultUri
