// What the lake keeps, and where: a landing copy for 30 days, bronze moving
// to cheaper tiers as it ages. Silver and gold are rebuilt from bronze, so
// they stay hot. Rules run once a day.
param lakeName string

resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' existing = {
  name: lakeName

  resource rules 'managementPolicies' = {
    name: 'default'
    properties: {
      policy: {
        rules: [
          {
            name: 'landing-kept-30-days'
            type: 'Lifecycle'
            definition: {
              filters: { blobTypes: ['blockBlob'], prefixMatch: ['landing/'] }
              actions: {
                baseBlob: { delete: { daysAfterModificationGreaterThan: 30 } }
              }
            }
          }
          {
            name: 'bronze-cools-with-age'
            type: 'Lifecycle'
            definition: {
              filters: { blobTypes: ['blockBlob'], prefixMatch: ['bronze/'] }
              actions: {
                baseBlob: {
                  tierToCool: { daysAfterModificationGreaterThan: 30 }
                  tierToCold: { daysAfterModificationGreaterThan: 90 }
                }
              }
            }
          }
        ]
      }
    }
  }
}
