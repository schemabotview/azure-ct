// One environment of the platform, deployed at subscription scope: the
// resource groups, then each module into its group.
targetScope = 'subscription'

param env string
param location string = 'uksouth'
param addressSpace string
param subnets array
param tags object = { app: 'risk-platform', env: env }
param runtimeAdmin string
@secure()
param runtimeAdminPassword string

resource net 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: 'rg-risk-${env}-net'
  location: location
  tags: tags
}
resource data 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: 'rg-risk-${env}-data'
  location: location
  tags: tags
}

module network 'modules/network.bicep' = {
  scope: net
  params: {
    name: 'vnet-risk-${env}-uks'
    addressSpace: addressSpace
    subnets: subnets
  }
}
module lake 'modules/lake.bicep' = {
  scope: data
  params: { name: 'stwgrisk${env}' }
}
module lifecycle 'modules/lifecycle.bicep' = {
  scope: data
  params: { lakeName: lake.outputs.lakeName }
}
module reports 'modules/reports.bicep' = {
  scope: data
  params: { name: 'stwgreports${env}' }
}
module share 'modules/share.bicep' = {
  scope: data
  params: { name: 'stwgcollat${env}' }
}
module factory 'modules/factory.bicep' = {
  scope: data
  params: {
    name: 'adf-wg-risk-${env}'
    lakeName: lake.outputs.lakeName
    vaultName: vault.outputs.vaultName
  }
}
module streaming 'modules/streaming.bicep' = {
  scope: data
  params: { name: 'evh-wg-risk-${env}', lakeName: lake.outputs.lakeName }
}
module messaging 'modules/messaging.bicep' = {
  scope: data
  params: { name: 'sb-wg-risk-${env}' }
}
module databricks 'modules/databricks.bicep' = {
  scope: data
  params: {
    name: 'dbw-wg-risk-${env}'
    vnetId: network.outputs.vnetId
    peSubnetId: '${network.outputs.vnetId}/subnets/snet-pe'
    lakeName: lake.outputs.lakeName
  }
}
module dbxVault 'modules/dbxvault.bicep' = {
  scope: data
  params: { name: 'kv-wg-dbx-${env}' }
}
module mart 'modules/mart.bicep' = {
  scope: data
  params: {
    name: 'psql-wg-riskmart-${env}'
    peSubnetId: '${network.outputs.vnetId}/subnets/snet-pe'
  }
}
module lookup 'modules/cosmos.bicep' = {
  scope: data
  params: { name: 'cosmos-wg-risk-${env}' }
}
module cache 'modules/cache.bicep' = {
  scope: data
  params: { name: 'redis-wg-risk-${env}' }
}
module api 'modules/app.bicep' = {
  scope: data
  params: {
    name: 'app-wg-exposure-${env}'
    appSubnetId: '${network.outputs.vnetId}/subnets/snet-app'
    martHost: 'psql-wg-riskmart-${env}.postgres.database.azure.com'
  }
}
module door 'modules/apim.bicep' = {
  scope: data
  params: {
    name: 'apim-wg-risk-${env}'
    backendUrl: 'https://app-wg-exposure-${env}.azurewebsites.net'
  }
}
module alerts 'modules/functions.bicep' = {
  scope: data
  params: {
    name: 'func-wg-breach-${env}'
    appSubnetId: '${network.outputs.vnetId}/subnets/snet-app'
    storageName: 'stwgfunc${env}'
  }
}
module filer 'modules/filer.bicep' = {
  scope: data
  params: {
    env: env
    jobsSubnetId: '${network.outputs.vnetId}/subnets/snet-jobs'
  }
}
module monitoring 'modules/monitoring.bicep' = {
  scope: data
  params: {
    env: env
    vaultName: vault.outputs.vaultName
    lakeName: lake.outputs.lakeName
    factoryName: factory.outputs.factoryName
  }
}
module paging 'modules/alerts.bicep' = {
  scope: data
  params: { env: env, workspaceId: monitoring.outputs.workspaceId }
}
module backup 'modules/backup.bicep' = {
  scope: data
  params: { env: env, martName: 'psql-wg-riskmart-${env}' }
  dependsOn: [mart]                   // the server must exist first
}
module edge 'modules/frontdoor.bicep' = {
  scope: data
  params: {
    env: env
    apiId: api.outputs.siteId
    apiHost: api.outputs.siteHost
    reportsId: reports.outputs.accountId
    reportsHost: reports.outputs.blobHost
  }
}
module vault 'modules/keyvault.bicep' = {
  scope: data
  params: { name: 'kv-wg-risk-${env}' }
}
module runtime 'modules/runtime.bicep' = {
  scope: data
  params: {
    env: env
    subnetId: '${network.outputs.vnetId}/subnets/snet-shir'
    adminUsername: runtimeAdmin
    adminPassword: runtimeAdminPassword
  }
}

output lakeId string = lake.outputs.lakeId
output vaultUri string = vault.outputs.vaultUri
