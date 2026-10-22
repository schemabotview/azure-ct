// The production factory: its own managed identity, reached only privately,
// and a self-hosted integration runtime for what is inside the bank.
// Pipelines are deployed into it from git (Course 6); nobody edits it here.
param location string = resourceGroup().location
param name string

resource factory 'Microsoft.DataFactory/factories@2018-06-01' = {
  name: name
  location: location
  identity: { type: 'SystemAssigned' }
  properties: {
    publicNetworkAccess: 'Disabled'
  }

  // The runtime's two VMs (runtime.bicep) register with this, by its key
  resource bank 'integrationRuntimes' = {
    name: 'ir-bank'
    properties: {
      type: 'SelfHosted'
      description: 'vm-wg-shir-prod-1 and -2: reaches TradeBook and the drops'
    }
  }
}

output principalId string = factory.identity.principalId
