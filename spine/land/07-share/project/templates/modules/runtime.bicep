// The self-hosted integration runtime's two Windows VMs (Course 8), one per
// zone, in snet-shir, with no public IP. Their admin password arrives as a
// secure parameter and never appears in the deployment's history.
param location string = resourceGroup().location
param env string
param subnetId string
param adminUsername string
@secure()
param adminPassword string

var zones = ['1', '3']

resource nic 'Microsoft.Network/networkInterfaces@2025-07-01' = [
  for (zone, i) in zones: {
    name: 'nic-wg-shir-${env}-${i + 1}'
    location: location
    properties: {
      ipConfigurations: [
        {
          name: 'ipconfig1'
          properties: {
            subnet: { id: subnetId }
            privateIPAllocationMethod: 'Dynamic'
          }
        }
      ]
    }
  }
]

resource vm 'Microsoft.Compute/virtualMachines@2025-11-01' = [
  for (zone, i) in zones: {
    name: 'vm-wg-shir-${env}-${i + 1}'
    location: location
    zones: [zone]
    identity: { type: 'SystemAssigned' }
    properties: {
      hardwareProfile: { vmSize: 'Standard_D4s_v5' }
      osProfile: {
        computerName: 'shir${i + 1}'
        adminUsername: adminUsername
        adminPassword: adminPassword
      }
      storageProfile: {
        imageReference: {
          publisher: 'MicrosoftWindowsServer'
          offer: 'WindowsServer'
          sku: '2022-datacenter-azure-edition'
          version: 'latest'
        }
        osDisk: {
          createOption: 'FromImage'
          managedDisk: { storageAccountType: 'Premium_LRS' }
        }
      }
      networkProfile: { networkInterfaces: [{ id: nic[i].id }] }
    }
  }
]
