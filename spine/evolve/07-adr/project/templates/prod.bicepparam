using 'main.bicep'

param env = 'prod'
param addressSpace = '10.110.0.0/20'
param subnets = [
  { name: 'snet-dbx-host', prefix: '10.110.0.0/26'
    delegation: 'Microsoft.Databricks/workspaces' }
  { name: 'snet-dbx-container', prefix: '10.110.0.64/26'
    delegation: 'Microsoft.Databricks/workspaces' }
  { name: 'snet-pe', prefix: '10.110.1.0/24', delegation: '' }
  { name: 'snet-app', prefix: '10.110.2.0/26'
    delegation: 'Microsoft.Web/serverFarms' }
  { name: 'snet-shir', prefix: '10.110.3.0/27', delegation: '' }
  { name: 'snet-jobs', prefix: '10.110.4.0/27'
    delegation: 'Microsoft.App/environments' }
]
param runtimeAdmin = 'shiradmin'
// Read from Key Vault at deployment time: never written here, never logged
param runtimeAdminPassword = az.getSecret(
  'aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e', 'rg-risk-prod-data',
  'kv-wg-risk-prod', 'runtime-admin-password')
