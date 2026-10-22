// A spoke, declared: what infra/05-network.sh built, as a description of
// the end state rather than steps to reach it. Subnets are child resources,
// each with its own lifecycle, made one after another: changes to one
// network's subnets in parallel collide.
param location string = resourceGroup().location
param name string
param addressSpace string
param subnets array

resource vnet 'Microsoft.Network/virtualNetworks@2025-07-01' = {
  name: name
  location: location
  properties: {
    addressSpace: { addressPrefixes: [addressSpace] }
  }
}

@batchSize(1)
resource subnet 'Microsoft.Network/virtualNetworks/subnets@2025-07-01' = [
  for s in subnets: {
    parent: vnet
    name: s.name
    properties: {
      addressPrefix: s.prefix
      defaultOutboundAccess: false
      delegations: empty(s.delegation) ? [] : [{
        name: s.delegation
        properties: { serviceName: s.delegation }
      }]
    }
  }
]

output vnetId string = vnet.id
