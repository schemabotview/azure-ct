// The Databricks workspace as an Azure resource: Premium (Unity Catalog and
// private link need it), injected into the spoke's two delegated subnets,
// with no public IPs on its machines and no public network access. An access
// connector gives Unity Catalog a managed identity to reach the lake.
param location string = resourceGroup().location
param name string
param vnetId string
param peSubnetId string
param lakeName string

var blobContributor = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'

resource connector 'Microsoft.Databricks/accessConnectors@2024-05-01' = {
  name: 'ac-wg-risk-${last(split(name, '-'))}'
  location: location
  identity: { type: 'SystemAssigned' }
}

resource workspace 'Microsoft.Databricks/workspaces@2024-05-01' = {
  name: name
  location: location
  sku: { name: 'premium' }
  properties: {
    managedResourceGroupId: subscriptionResourceId(
      'Microsoft.Resources/resourceGroups', 'rg-${name}-managed')
    publicNetworkAccess: 'Disabled'
    requiredNsgRules: 'NoAzureDatabricksRules'   // private link only
    parameters: {
      customVirtualNetworkId: { value: vnetId }
      customPublicSubnetName: { value: 'snet-dbx-host' }
      customPrivateSubnetName: { value: 'snet-dbx-container' }
      enableNoPublicIp: { value: true }          // secure cluster connectivity
    }
  }
}

// Back-end private link: the clusters reach the control plane through this
// endpoint in snet-pe (the same sub-resource serves the front end)
resource backEnd 'Microsoft.Network/privateEndpoints@2025-07-01' = {
  name: 'pe-${name}'
  location: location
  properties: {
    subnet: { id: peSubnetId }
    privateLinkServiceConnections: [{
      name: 'databricks-ui-api'
      properties: {
        privateLinkServiceId: workspace.id
        groupIds: ['databricks_ui_api']
      }
    }]
  }
}

resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' existing = {
  name: lakeName
}

// Unity Catalog reads and writes the lake as the connector's identity
resource ucWrites 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(lake.id, connector.id, blobContributor)
  scope: lake
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', blobContributor)
    principalId: connector.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

output workspaceUrl string = workspace.properties.workspaceUrl
output connectorId string = connector.id
