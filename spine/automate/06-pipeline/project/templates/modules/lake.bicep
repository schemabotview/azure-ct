// The lake: a storage account with a hierarchical namespace, no public
// network access, and no shared keys: Entra identities and roles only.
param location string = resourceGroup().location
param name string
param redundancy string = 'Standard_ZRS'

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

output lakeId string = lake.id
