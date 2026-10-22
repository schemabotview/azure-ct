// The production factory: its own managed identity, reached only privately,
// and a self-hosted integration runtime for what is inside the bank.
// Pipelines are deployed into it from git (Course 6); nobody edits it here.
param location string = resourceGroup().location
param name string
param lakeName string
param vaultName string

var secretsUser = '4633458b-17de-408a-b874-0445c86b69e6'   // built-in roles
var blobContributor = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var writes = ['landing', 'bronze']

resource factory 'Microsoft.DataFactory/factories@2018-06-01' = {
  name: name
  location: location
  identity: { type: 'SystemAssigned' }
  properties: {
    publicNetworkAccess: 'Disabled'
  }

  // The runtime's two VMs (runtime.bicep) register with this, by its key
  resource bank 'integrationRuntimes' = {
    name: 'ir-bank'
    properties: {
      type: 'SelfHosted'
      description: 'vm-wg-shir-prod-1 and -2: reaches TradeBook and the drops'
    }
  }
}

resource vault 'Microsoft.KeyVault/vaults@2025-05-01' existing = {
  name: vaultName
}
resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' existing = {
  name: lakeName

  resource blobs 'blobServices' existing = {
    name: 'default'

    resource zones 'containers' existing = [for z in writes: { name: z }]
  }
}

// Read secrets in this vault, and write in landing and bronze: nothing more
resource readSecrets 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(vault.id, factory.id, secretsUser)
  scope: vault
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', secretsUser)
    principalId: factory.identity.principalId
    principalType: 'ServicePrincipal'
  }
}
resource writeZones 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for (z, i) in writes: {
    name: guid(lake::blobs::zones[i].id, factory.id, blobContributor)
    scope: lake::blobs::zones[i]
    properties: {
      roleDefinitionId: subscriptionResourceId(
        'Microsoft.Authorization/roleDefinitions', blobContributor)
      principalId: factory.identity.principalId
      principalType: 'ServicePrincipal'
    }
  }
]

output principalId string = factory.identity.principalId
