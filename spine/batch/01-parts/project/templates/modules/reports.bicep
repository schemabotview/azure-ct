// The large exposures reports: once filed, nobody can change or delete one
// for seven years (a container-level WORM policy, locked by
// infra/07-lock-reports.sh). A separate account, so its readers, its
// redundancy and its policy are its own.
param location string = resourceGroup().location
param name string
param retentionDays int = 2557  // seven years, two of them leap years

resource reports 'Microsoft.Storage/storageAccounts@2025-08-01' = {
  name: name
  location: location
  sku: { name: 'Standard_GZRS' }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    publicNetworkAccess: 'Disabled'
  }
}

resource blobs 'Microsoft.Storage/storageAccounts/blobServices@2025-08-01' = {
  parent: reports
  name: 'default'
  properties: {
    deleteRetentionPolicy: { enabled: true, days: 14 }
  }

  resource filed 'containers' = {
    name: 'large-exposures'

    resource worm 'immutabilityPolicies' = {
      name: 'default'
      properties: {
        immutabilityPeriodSinceCreationInDays: retentionDays
        allowProtectedAppendWrites: false
      }
    }
  }
}
