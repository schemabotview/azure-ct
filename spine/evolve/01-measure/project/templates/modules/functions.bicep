// The breach alert's host: a Flex Consumption function app, which scales to
// zero, joins the spoke for outbound calls, and connects to Service Bus and
// its own storage as its managed identity, with no connection strings.
param location string = resourceGroup().location
param name string
param appSubnetId string
param storageName string

var blob = 'https://${storageName}.blob.${environment().suffixes.storage}/'
var blobOwner = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'

// The host's own storage: its code package and its bookkeeping, no keys
resource store 'Microsoft.Storage/storageAccounts@2025-08-01' = {
  name: storageName
  location: location
  sku: { name: 'Standard_ZRS' }
  kind: 'StorageV2'
  properties: { allowSharedKeyAccess: false, minimumTlsVersion: 'TLS1_2' }

  resource blobs 'blobServices' = {
    name: 'default'

    resource releases 'containers' = { name: 'releases' }
  }
}

resource plan 'Microsoft.Web/serverfarms@2024-11-01' = {
  name: 'asp-${name}'
  location: location
  kind: 'functionapp'
  sku: { name: 'FC1', tier: 'FlexConsumption' }
  properties: { reserved: true }
}

resource fn 'Microsoft.Web/sites@2024-11-01' = {
  name: name
  location: location
  kind: 'functionapp,linux'
  identity: { type: 'SystemAssigned' }
  properties: {
    serverFarmId: plan.id
    httpsOnly: true
    virtualNetworkSubnetId: appSubnetId
    functionAppConfig: {
      deployment: {
        storage: {
          type: 'blobContainer'
          value: '${blob}releases'
          authentication: { type: 'SystemAssignedIdentity' }
        }
      }
      runtime: { name: 'python', version: '3.12' }
      scaleAndConcurrency: { maximumInstanceCount: 40, instanceMemoryMB: 2048 }
    }
    siteConfig: {
      appSettings: [
        { name: 'AzureWebJobsStorage__accountName', value: storageName }
        {
          name: 'ServiceBus__fullyQualifiedNamespace'
          value: 'sb-wg-risk-prod.servicebus.windows.net'
        }
      ]
    }
  }
}

resource hostStorage 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(store.id, fn.id, blobOwner)
  scope: store
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', blobOwner)
    principalId: fn.identity.principalId
    principalType: 'ServicePrincipal'
  }
}
