// A small vault for Databricks alone. A Key Vault-backed secret scope works
// only with the access-policy permission model, and the platform's vault uses
// Azure roles, so this one holds just the secrets Databricks jobs need. The
// scope adds Get and List for AzureDatabricks when it is created. Databricks
// reads it from its control plane, so trusted Microsoft services may pass.
param location string = resourceGroup().location
param name string

resource vault 'Microsoft.KeyVault/vaults@2025-05-01' = {
  name: name
  location: location
  properties: {
    tenantId: tenant().tenantId
    sku: { family: 'A', name: 'standard' }
    enableRbacAuthorization: false
    accessPolicies: []
    enablePurgeProtection: true
    softDeleteRetentionInDays: 90
    networkAcls: { defaultAction: 'Deny', bypass: 'AzureServices' }
  }
}

output vaultId string = vault.id
output vaultUri string = vault.properties.vaultUri
