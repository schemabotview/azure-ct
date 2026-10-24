// One door for other teams: API Management in front of the exposure API,
// with its contract (the routes), its policy (sign-in, throttling) and a
// subscription per consuming team.
param location string = resourceGroup().location
param name string
param backendUrl string

resource apim 'Microsoft.ApiManagement/service@2024-05-01' = {
  name: name
  location: location
  sku: { name: 'StandardV2', capacity: 1 }
  identity: { type: 'SystemAssigned' }
  properties: {
    publisherName: 'Woodgrove Bank risk platform'
    publisherEmail: 'risk-platform@woodgrovebank.example'
  }

  resource exposure 'apis' = {
    name: 'exposure'
    properties: {
      displayName: 'Exposure API'
      path: 'exposure'
      protocols: ['https']
      serviceUrl: backendUrl
      subscriptionRequired: true
    }

    resource headroom 'operations' = {
      name: 'get-headroom'
      properties: {
        displayName: 'Headroom for a group'
        method: 'GET'
        urlTemplate: '/groups/{groupId}/headroom'
        templateParameters: [
          { name: 'groupId', type: 'string', required: true }
        ]
      }
    }

    resource policy 'policies' = {
      name: 'policy'
      properties: {
        format: 'rawxml'
        value: loadTextContent('../../policies/apim/exposure-api.xml')
      }
    }
  }
}
