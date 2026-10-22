import type { Scene, SceneNode } from '@graphlearning/flow'

// UK South has three availability zones; UK West has none; the two are each other's region pair.
// Zone numbers are logical: a subscription's zone 1 may be a different datacentre from another
// subscription's zone 1.
// source: https://learn.microsoft.com/en-us/azure/reliability/regions-paired
// source: https://learn.microsoft.com/en-us/azure/reliability/availability-zones-region-support
// source: https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview
const zone = (id: string, label: string, lost = false): SceneNode => ({
  id, label, pattern: lost ? 'warn' : 'network', icon: 'building', cols: 1,
  children: [{ id: `${id}-dc`, label: 'own power, cooling, network', variant: 'chip', icon: 'none', pattern: lost ? 'warn' : 'network' }],
})

export const regions: Scene = {
  id: 'azure-regions',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'uk',
      label: 'Geography: United Kingdom',
      icon: 'globe',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'uksouth',
          label: 'UK South · London',
          sub: 'three availability zones',
          icon: 'region',
          pattern: 'group',
          cols: 1,
          children: [zone('az1', 'Zone 1'), zone('az2', 'Zone 2', true), zone('az3', 'Zone 3')],
        },
        {
          id: 'ukwest',
          label: 'UK West · Cardiff',
          sub: 'no availability zones',
          icon: 'region',
          pattern: 'group',
          cols: 1,
          children: [{ id: 'ukwest-dc', label: 'one set of datacentres', variant: 'chip', icon: 'none', pattern: 'network' }],
        },
      ],
      edges: [{ source: 'uksouth', target: 'ukwest', label: 'region pair', bidirectional: true }],
    },
    {
      id: 'tables',
      label: 'What each boundary contains',
      bare: true,
      children: [
        {
          id: 'boundaries',
          kind: 'table',
          label: 'Four boundaries',
          headers: ['boundary', 'contains a failure of'],
          values: [
            ['a host', 'one machine: a VM restarts elsewhere'],
            ['a zone', 'a datacentre: power, cooling, network'],
            ['a Region', 'every zone in it: a regional disaster'],
            ['a geography', 'where data may live: UK law, UK data'],
          ],
        },
        {
          id: 'lost',
          kind: 'table',
          label: 'Zone 2 is lost: what keeps running?',
          headers: ['the platform’s part', 'deployed as', 'keeps running'],
          values: [
            ['the lake', 'zone-redundant storage (ZRS)', 'yes'],
            ['the risk mart', 'zone-redundant HA', 'yes, after failover'],
            ['an integration VM', 'one VM in zone 2', 'no'],
            ['two integration VMs', 'zones 1 and 3', 'yes'],
          ],
        },
        {
          id: 'notes',
          kind: 'list',
          icon: 'circleslash',
          label: 'What these are not',
          pattern: 'warn',
          items: [
            'Zone numbers are per subscription: your 1 is not mine',
            'A region pair is for recovery, not for spreading load',
            'UK West cannot host a zone-redundant design',
            'A Region inside the UK keeps data in the UK; a pair keeps it there too',
          ],
        },
      ],
    },
  ],
  edges: [],
}
