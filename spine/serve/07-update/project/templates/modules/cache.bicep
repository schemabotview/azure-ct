// A cache in front of the mart's headroom, for the dashboard only: Azure
// Managed Redis, Entra ID sign-in, no access keys, private.
param location string = resourceGroup().location
param name string

resource cache 'Microsoft.Cache/redisEnterprise@2025-07-01' = {
  name: name
  location: location
  sku: { name: 'Balanced_B1' }
  properties: {
    minimumTlsVersion: '1.2'
    publicNetworkAccess: 'Disabled'
  }

  resource db 'databases' = {
    name: 'default'
    properties: {
      accessKeysAuthentication: 'Disabled'
      evictionPolicy: 'VolatileLRU'
      clusteringPolicy: 'OSSCluster'
    }
  }
}
