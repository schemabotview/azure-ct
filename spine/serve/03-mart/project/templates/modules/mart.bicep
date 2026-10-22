// The risk mart: PostgreSQL 16 flexible server, General Purpose with two
// vCores, a standby in another zone, 14 days of backups copied to UK West,
// Entra ID sign-in only, reached through a private endpoint in snet-pe.
param location string = resourceGroup().location
param name string
param peSubnetId string

resource mart 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' = {
  name: name
  location: location
  sku: { name: 'Standard_D2ds_v5', tier: 'GeneralPurpose' }
  properties: {
    version: '16'
    availabilityZone: '1'
    highAvailability: { mode: 'ZoneRedundant', standbyAvailabilityZone: '3' }
    storage: { storageSizeGB: 128, autoGrow: 'Enabled' }
    backup: { backupRetentionDays: 14, geoRedundantBackup: 'Enabled' }
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Disabled'          // no password exists to leak
      tenantId: tenant().tenantId
    }
    network: { publicNetworkAccess: 'Disabled' }
  }

  resource database 'databases' = { name: 'riskmart' }
}

resource endpoint 'Microsoft.Network/privateEndpoints@2025-07-01' = {
  name: 'pe-${name}'
  location: location
  properties: {
    subnet: { id: peSubnetId }
    privateLinkServiceConnections: [{
      name: 'postgresql'
      properties: {
        privateLinkServiceId: mart.id
        groupIds: ['postgresqlServer']
      }
    }]
  }
}
