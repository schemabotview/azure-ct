// The platform's streams: one Event Hubs namespace, Standard (the Kafka
// endpoint needs Standard or above), private, signed in with Entra ID only.
// A partition key keeps one pair's or one deal's events in order.
param location string = resourceGroup().location
param name string
param throughputUnits int = 2

resource namespace 'Microsoft.EventHub/namespaces@2024-01-01' = {
  name: name
  location: location
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
    properties: { partitionCount: 4, messageRetentionInDays: 1 }

    resource intraday 'consumergroups' = { name: 'exposure-intraday' }
  }

  resource dealEvents 'eventhubs' = {
    name: 'deal-events'             // key: the deal
    properties: { partitionCount: 4, messageRetentionInDays: 1 }

    resource intraday 'consumergroups' = { name: 'exposure-intraday' }
  }
}
