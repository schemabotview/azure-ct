import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/transform/02-network/project/templates/modules/network.bicep?raw'
import session from '../../../spine/transform/02-network/session.txt?raw'

// VNet injection: the workspace's clusters run in two customer subnets (host and container, named
// "public" and "private" in the API), both delegated to Microsoft.Databricks/workspaces and each with
// a network security group; each node takes one address in each. Secure cluster connectivity (no
// public IP) means nodes have no public addresses and open no inbound ports: they connect out to the
// control plane's relay. Private link: front-end (users to the workspace) and back-end (clusters to
// the control plane); with back-end private link the required NSG rules can be NoAzureDatabricksRules.
// source: https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/vnet-inject
// source: https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/secure-cluster-connectivity
// source: https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/private-link
export const network: Scene = mapFrame('dbx-network', [...BUILT_BY[9], 'dbx'], {
  id: 'dbx-network-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'dbx-network-code', kind: 'code', filename: 'templates/modules/network.bicep', label: code.replace(/\n+$/, ''), show: [[18, 23], [30, 35]], highlight: [20, 33, 34], pattern: 'network' },
    { id: 'dbx-network-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a capacity model', label: session.replace(/\n+$/, '') },
    {
      id: 'dbx-paths',
      kind: 'table',
      label: 'Three paths, all private',
      headers: ['from → to', 'how'],
      values: [
        ['engineer → workspace', 'front-end private link, via the hub'],
        ['cluster → control plane', 'back-end private link; out only'],
        ['cluster → lake', 'private endpoints in snet-pe'],
        ['internet → cluster', 'nothing: no public IPs, no ports'],
      ],
    },
  ],
})
