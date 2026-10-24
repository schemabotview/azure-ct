using 'main.bicep'

param env = 'dev'
param addressSpace = '10.120.0.0/20'
param subnets = [
  { name: 'snet-dbx-host', prefix: '10.120.0.0/26'
    delegation: 'Microsoft.Databricks/workspaces' }
  { name: 'snet-dbx-container', prefix: '10.120.0.64/26'
    delegation: 'Microsoft.Databricks/workspaces' }
  { name: 'snet-pe', prefix: '10.120.1.0/24', delegation: '' }
  { name: 'snet-app', prefix: '10.120.2.0/26'
    delegation: 'Microsoft.Web/serverFarms' }
  { name: 'snet-shir', prefix: '10.120.3.0/27', delegation: '' }
  { name: 'snet-jobs', prefix: '10.120.4.0/27'
    delegation: 'Microsoft.App/environments' }
]
param runtimeAdmin = 'shiradmin'
param runtimeAdminPassword = az.getSecret(
  'bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f', 'rg-risk-dev-data',
  'kv-wg-risk-dev', 'runtime-admin-password')
