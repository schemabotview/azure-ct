// The platform's streams: one Event Hubs namespace, Standard (the Kafka
// endpoint needs Standard or above), private, signed in with Entra ID only.
// A partition key keeps one pair's or one deal's events in order.
param location string = resourceGroup().location
param name string
param throughputUnits int = 2
param lakeName string

var blobContributor = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var archivePath = [
  '{Namespace}', '{EventHub}', '{PartitionId}'
  '{Year}', '{Month}', '{Day}', '{Hour}', '{Minute}', '{Second}'
]
// Capture: every event, as Avro files in bronze, every 5 minutes or 300 MB
var capture = {
  enabled: true
  encoding: 'Avro'
  intervalInSeconds: 300
  sizeLimitInBytes: 314572800
  skipEmptyArchives: true
  destination: {
    name: 'EventHubArchive.AzureBlockBlob'
    identity: { type: 'SystemAssigned' }
    properties: {
      storageAccountResourceId: lake.id
      blobContainer: 'bronze'
      archiveNameFormat: join(archivePath, '/')
    }
  }
}

resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' existing = {
  name: lakeName

  resource blobs 'blobServices' existing = {
    name: 'default'

    resource bronze 'containers' existing = { name: 'bronze' }
  }
}

resource namespace 'Microsoft.EventHub/namespaces@2024-01-01' = {
  name: name
  location: location
  identity: { type: 'SystemAssigned' }   // what Capture writes as
  sku: { name: 'Standard', tier: 'Standard', capacity: throughputUnits }
  properties: {
    kafkaEnabled: true
    disableLocalAuth: true          // no shared access keys
    publicNetworkAccess: 'Disabled'
    minimumTlsVersion: '1.2'
    isAutoInflateEnabled: true
    maximumThroughputUnits: 4
  }

  resource fxRates 'eventhubs' = {
    name: 'fx-rates'                // key: the currency pair
    properties: {
      partitionCount: 4
      messageRetentionInDays: 1
      captureDescription: capture
    }

    resource intraday 'consumergroups' = { name: 'exposure-intraday' }
  }

  resource dealEvents 'eventhubs' = {
    name: 'deal-events'             // key: the deal
    properties: {
      partitionCount: 4
      messageRetentionInDays: 1
      captureDescription: capture
    }

    resource intraday 'consumergroups' = { name: 'exposure-intraday' }
  }
}

// Capture writes to bronze as the namespace's own identity
resource captureWrites 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(lake::blobs::bronze.id, namespace.id, blobContributor)
  scope: lake::blobs::bronze
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', blobContributor)
    principalId: namespace.identity.principalId
    principalType: 'ServicePrincipal'
  }
}
