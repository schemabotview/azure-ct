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
