// Service Bus for the deal workflow's steps: one queue, one session per deal
// so a deal's steps are handled in order by one reader at a time, and
// duplicate detection so a resent step is dropped. Standard tier: sessions
// and duplicate detection need it.
param location string = resourceGroup().location
param name string

resource namespace 'Microsoft.ServiceBus/namespaces@2024-01-01' = {
  name: name
  location: location
  sku: { name: 'Standard', tier: 'Standard' }
  properties: {
    disableLocalAuth: true
    minimumTlsVersion: '1.2'
  }

  resource dealSteps 'queues' = {
    name: 'deal-steps'
    properties: {
      requiresSession: true
      requiresDuplicateDetection: true
      duplicateDetectionHistoryTimeWindow: 'PT10M'
      lockDuration: 'PT30S'
      maxDeliveryCount: 3            // then it goes to the dead-letter queue
      deadLetteringOnMessageExpiration: true
      defaultMessageTimeToLive: 'P1D'
    }
  }
}
