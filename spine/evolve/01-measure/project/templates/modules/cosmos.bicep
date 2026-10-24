// The group lookup: Cosmos DB for NoSQL, session consistency, Entra ID only,
// private. One container, partitioned by group, autoscaling to 4,000 RU/s.
param location string = resourceGroup().location
param name string

resource account 'Microsoft.DocumentDB/databaseAccounts@2024-11-15' = {
  name: name
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    consistencyPolicy: { defaultConsistencyLevel: 'Session' }
    locations: [{ locationName: location, isZoneRedundant: true }]
    disableLocalAuth: true
    publicNetworkAccess: 'Disabled'
  }

  resource risk 'sqlDatabases' = {
    name: 'risk'
    properties: { resource: { id: 'risk' } }

    resource groups 'containers' = {
      name: 'groups'
      properties: {
        resource: {
          id: 'groups'
          partitionKey: { paths: ['/groupId'], kind: 'Hash' }
        }
        options: { autoscaleSettings: { maxThroughput: 4000 } }
      }
    }
  }
}
