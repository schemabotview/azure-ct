// Front Door for the Singapore office: one global door, two private origins
// in UK South. Past reports never change, so the edge keeps them; today's
// exposure changes all day, so the API route never caches.
param env string
param apiId string          // the App Service site
param apiHost string
param reportsId string      // the reports storage account
param reportsHost string

resource profile 'Microsoft.Cdn/profiles@2025-04-15' = {
  name: 'afd-wg-risk-${env}'
  location: 'global'
  sku: { name: 'Premium_AzureFrontDoor' }   // Premium: Private Link origins
}

resource endpoint 'Microsoft.Cdn/profiles/afdEndpoints@2025-04-15' = {
  parent: profile
  name: 'risk-${env}'
  location: 'global'
  properties: { enabledState: 'Enabled' }
}

var probe = {
  probePath: '/health'
  probeProtocol: 'Https'
  probeRequestType: 'GET'
  probeIntervalInSeconds: 30
}
var balancing = { sampleSize: 4, successfulSamplesRequired: 3 }

resource api 'Microsoft.Cdn/profiles/originGroups@2025-04-15' = {
  parent: profile
  name: 'api'
  properties: { loadBalancingSettings: balancing, healthProbeSettings: probe }

  resource app 'origins' = {
    name: 'app-uksouth'
    properties: {
      hostName: apiHost
      originHostHeader: apiHost
      sharedPrivateLinkResource: {
        privateLink: { id: apiId }
        groupId: 'sites'
        privateLinkLocation: 'uksouth'
        requestMessage: 'Front Door for the risk dashboard'
      }
    }
  }
}

resource reports 'Microsoft.Cdn/profiles/originGroups@2025-04-15' = {
  parent: profile
  name: 'reports'
  properties: { loadBalancingSettings: balancing }

  resource blob 'origins' = {
    name: 'reports-uksouth'
    properties: {
      hostName: reportsHost
      originHostHeader: reportsHost
      sharedPrivateLinkResource: {
        privateLink: { id: reportsId }
        groupId: 'blob'
        privateLinkLocation: 'uksouth'
        requestMessage: 'Front Door for past reports'
      }
    }
  }
}

resource apiRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-04-15' = {
  parent: endpoint
  name: 'api'
  properties: {
    originGroup: { id: api.id }
    patternsToMatch: ['/api/*']
    supportedProtocols: ['Https']
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    // no cacheConfiguration: every request goes to the API
  }
  dependsOn: [api::app]
}

resource reportRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-04-15' = {
  parent: endpoint
  name: 'reports'
  properties: {
    originGroup: { id: reports.id }
    originPath: '/large-exposures'
    patternsToMatch: ['/reports/*']
    supportedProtocols: ['Https']
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'IgnoreQueryString'   // one copy per file
    }
  }
  dependsOn: [reports::blob]
}
