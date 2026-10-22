// The lake: a storage account with a hierarchical namespace, no public
// network access, and no shared keys: Entra identities and roles only.
// Its four zones are containers; a deleted file is kept 14 days.
param location string = resourceGroup().location
param name string
param redundancy string = 'Standard_ZRS'
param zones array = ['landing', 'bronze', 'silver', 'gold']

resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' = {
  name: name
  location: location
  sku: { name: redundancy }
  kind: 'StorageV2'
  properties: {
    isHnsEnabled: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    publicNetworkAccess: 'Disabled'
  }
}

resource blobs 'Microsoft.Storage/storageAccounts/blobServices@2025-08-01' = {
  parent: lake
  name: 'default'
  properties: {
    deleteRetentionPolicy: { enabled: true, days: 14 }
    containerDeleteRetentionPolicy: { enabled: true, days: 14 }
  }

  resource zone 'containers' = [for z in zones: { name: z }]
}

output lakeId string = lake.id
output lakeName string = lake.name
