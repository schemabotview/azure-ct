// The exposure API on App Service: a Linux plan across three zones, the
// app with its own identity and no secret in its settings, inside the spoke
// (snet-app), with a staging slot for releases and autoscale on CPU.
param location string = resourceGroup().location
param name string
param appSubnetId string
param martHost string
param identityName string = 'id-wg-exposure-prod'

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' existing = {
  name: identityName
}

resource plan 'Microsoft.Web/serverfarms@2024-11-01' = {
  name: 'asp-${name}'
  location: location
  kind: 'linux'
  sku: { name: 'P1v3', capacity: 3 }     // three instances, one per zone
  properties: { reserved: true, zoneRedundant: true }
}

var vault = 'kv-wg-risk-prod'
var site = {
  serverFarmId: plan.id
  httpsOnly: true
  publicNetworkAccess: 'Disabled'          // reached through the gateway
  virtualNetworkSubnetId: appSubnetId      // and out through the spoke
  keyVaultReferenceIdentity: identity.id
  siteConfig: {
    linuxFxVersion: 'PYTHON|3.12'
    appCommandLine: 'python app/server.py'
    healthCheckPath: '/health'
    minTlsVersion: '1.2'
    ftpsState: 'Disabled'
    appSettings: [
      { name: 'MART_HOST', value: martHost }
      { name: 'MART_DATABASE', value: 'riskmart' }
      { name: 'AZURE_CLIENT_ID', value: identity.properties.clientId }
      {
        name: 'LIMITS_SERVICE_KEY'           // the bank's limits system
        value: '@Microsoft.KeyVault(VaultName=${vault};SecretName=limits-key)'
      }
    ]
  }
}

resource app 'Microsoft.Web/sites@2024-11-01' = {
  name: name
  location: location
  kind: 'app,linux'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identity.id}': {} }
  }
  properties: site

  resource staging 'slots' = {             // the next release warms up here
    name: 'staging'
    location: location
    identity: {
      type: 'UserAssigned'
      userAssignedIdentities: { '${identity.id}': {} }
    }
    properties: site
  }
}

// Add an instance above 70% CPU for 10 minutes, remove one below 30%
var steps = [['GreaterThan', 70, 'Increase'], ['LessThan', 30, 'Decrease']]

resource scale 'Microsoft.Insights/autoscalesettings@2022-10-01' = {
  name: 'autoscale-${name}'
  location: location
  properties: {
    enabled: true
    targetResourceUri: plan.id
    profiles: [{
      name: 'cpu'
      capacity: { minimum: '3', maximum: '10', default: '3' }
      rules: [for r in steps: {
        metricTrigger: {
          metricName: 'CpuPercentage'
          metricResourceUri: plan.id
          timeGrain: 'PT1M'
          statistic: 'Average'
          timeWindow: 'PT10M'
          timeAggregation: 'Average'
          operator: r[0]
          threshold: r[1]
        }
        scaleAction: {
          direction: r[2]
          type: 'ChangeCount'
          value: '1'
          cooldown: 'PT10M'
        }
      }]
    }]
  }
}
