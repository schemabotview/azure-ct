// The collateral team's share: an SMB file share they map as a drive, signed
// in with their own bank accounts through Microsoft Entra Kerberos, reached
// only through a private endpoint over ExpressRoute.
param location string = resourceGroup().location
param name string
param quotaGiB int = 100

resource files 'Microsoft.Storage/storageAccounts@2025-08-01' = {
  name: name
  location: location
  sku: { name: 'Standard_ZRS' }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Disabled'
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: 'AADKERB'
      defaultSharePermission: 'None'  // only those given a share role
    }
  }
}

resource service 'Microsoft.Storage/storageAccounts/fileServices@2025-08-01' = {
  parent: files
  name: 'default'

  resource collateral 'shares' = {
    name: 'collateral'
    properties: { shareQuota: quotaGiB, enabledProtocols: 'SMB' }
  }
}
