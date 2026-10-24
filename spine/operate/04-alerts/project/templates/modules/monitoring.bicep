// Where the platform's telemetry goes: one Log Analytics workspace, the
// API's Application Insights inside it, and diagnostic settings that send
// it the vault's audit log, the lake's reads, writes and deletes, and the
// factory's pipeline runs.
param location string = resourceGroup().location
param env string
param vaultName string
param lakeName string
param factoryName string

resource logs 'Microsoft.OperationalInsights/workspaces@2025-02-01' = {
  name: 'log-wg-risk-${env}'
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 90                    // interactive; then archived
  }
}

resource insights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi-wg-exposure-${env}'
  location: location
  kind: 'web'
  properties: { Application_Type: 'web', WorkspaceResourceId: logs.id }
}

resource vault 'Microsoft.KeyVault/vaults@2025-05-01' existing = {
  name: vaultName
}
resource lake 'Microsoft.Storage/storageAccounts@2025-08-01' existing = {
  name: lakeName

  resource blobs 'blobServices' existing = { name: 'default' }
}
resource factory 'Microsoft.DataFactory/factories@2018-06-01' existing = {
  name: factoryName
}

resource kvAudit 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: vault
  properties: {
    workspaceId: logs.id
    logs: [{ categoryGroup: 'audit', enabled: true }]
  }
}

resource lakeLog 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: lake::blobs
  properties: {
    workspaceId: logs.id
    logs: [
      { category: 'StorageRead', enabled: true }
      { category: 'StorageWrite', enabled: true }
      { category: 'StorageDelete', enabled: true }
    ]
  }
}

resource adfLog 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: factory
  properties: {
    workspaceId: logs.id
    logAnalyticsDestinationType: 'Dedicated'     // table ADFPipelineRun
    logs: [{ category: 'PipelineRuns', enabled: true }]
  }
}

output workspaceId string = logs.id
