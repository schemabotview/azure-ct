// The morning report's filer: a Container Apps job that runs once a day,
// pulls its image from the platform's registry as its own identity, builds
// the large exposures file from gold and files it in the locked reports.
param location string = resourceGroup().location
param env string
param jobsSubnetId string
param image string = 'filer:1.0.3'

var acrPull = '7f951dda-4ed3-4680-a7ca-43fe172d538d'

resource registry 'Microsoft.ContainerRegistry/registries@2025-04-01' = {
  name: 'crwgrisk${env}'
  location: location
  sku: { name: 'Premium' }                 // private endpoints need Premium
  properties: { adminUserEnabled: false, publicNetworkAccess: 'Disabled' }
}

resource jobs 'Microsoft.App/managedEnvironments@2025-01-01' = {
  name: 'cae-wg-risk-${env}'
  location: location
  properties: {
    vnetConfiguration: { infrastructureSubnetId: jobsSubnetId, internal: true }
    workloadProfiles: [
      { name: 'Consumption', workloadProfileType: 'Consumption' }
    ]
  }
}

resource filer 'Microsoft.App/jobs@2025-01-01' = {
  name: 'job-wg-filer-${env}'
  location: location
  identity: { type: 'SystemAssigned' }
  properties: {
    environmentId: jobs.id
    configuration: {
      triggerType: 'Schedule'
      scheduleTriggerConfig: { cronExpression: '30 5 * * *' }  // UTC
      replicaTimeout: 1800
      replicaRetryLimit: 2
      registries: [
        { server: registry.properties.loginServer, identity: 'system' }
      ]
    }
    template: {
      containers: [{
        name: 'filer'
        image: '${registry.properties.loginServer}/${image}'
        resources: { cpu: json('1.0'), memory: '2Gi' }
      }]
    }
  }
}

// The job pulls its image as its own identity (AcrPull, built in)
resource canPull 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(registry.id, filer.id, acrPull)
  scope: registry
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', acrPull)
    principalId: filer.identity.principalId
    principalType: 'ServicePrincipal'
  }
}
