// Backups the platform's own people cannot delete: a Backup vault with
// soft delete always on and immutability locked, and a weekly long-term
// backup of the risk mart kept a year, beside the server's own 14 days.
param location string = resourceGroup().location
param env string
param martName string

var postgres = 'Microsoft.DBforPostgreSQL/flexibleServers'
var vaultStore = {
  dataStoreType: 'VaultStore'
  objectType: 'DataStoreInfoBase'
}

resource db 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' existing = {
  name: martName
}

resource vault 'Microsoft.DataProtection/backupVaults@2025-07-01' = {
  name: 'bv-wg-risk-${env}'
  location: location
  identity: { type: 'SystemAssigned' }
  properties: {
    storageSettings: [{ datastoreType: 'VaultStore', type: 'GeoRedundant' }]
    securitySettings: {
      softDeleteSettings: { state: 'AlwaysOn', retentionDurationInDays: 14 }
      immutabilitySettings: { state: 'Locked' }    // cannot be switched off
    }
  }

  resource weekly 'backupPolicies' = {
    name: 'riskmart-weekly'
    properties: {
      objectType: 'BackupPolicy'
      datasourceTypes: [postgres]
      policyRules: [
        {
          objectType: 'AzureBackupRule'
          name: 'Weekly'
          backupParameters: {
            objectType: 'AzureBackupParams'
            backupType: 'Full'
          }
          dataStore: vaultStore
          trigger: {
            objectType: 'ScheduleBasedTriggerContext'
            schedule: {   // Sundays 03:00 UTC, after the night has finished
              repeatingTimeIntervals: ['R/2026-10-18T03:00:00+00:00/P1W']
            }
            taggingCriteria: [{
              isDefault: true
              tagInfo: { tagName: 'Default' }
              taggingPriority: 99
            }]
          }
        }
        {
          objectType: 'AzureRetentionRule'
          name: 'Default'
          isDefault: true
          lifecycles: [{
            deleteAfter: {
              objectType: 'AbsoluteDeleteOption'
              duration: 'P1Y'
            }
            sourceDataStore: vaultStore
          }]
        }
      ]
    }
  }

  resource instance 'backupInstances' = {
    name: martName
    properties: {
      objectType: 'BackupInstance'
      dataSourceInfo: {
        objectType: 'Datasource'
        datasourceType: postgres
        resourceType: postgres
        resourceID: db.id
        resourceName: martName
        resourceLocation: location
      }
      policyInfo: { policyId: weekly.id }
    }
  }
}
