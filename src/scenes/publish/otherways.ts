import type { Scene } from '@graphlearning/flow'

// The same API on other Azure compute: a VM (the customer runs the OS), a Virtual Machine Scale Set
// (identical VMs, autoscale), Container Apps (containers, scale to zero, revisions, KEDA scalers),
// AKS (managed Kubernetes control plane, customer-run node pools and cluster operations), Functions
// (event-driven, per-execution hosting plans). App Service runs code or a container on managed
// instances.
// source: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree
// source: https://learn.microsoft.com/en-us/azure/container-apps/compare-options
export const otherways: Scene = {
  id: 'other-ways-to-run-it',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'ways',
      kind: 'table',
      label: 'The exposure API, six ways',
      headers: ['', 'the bank runs', 'scales by', 'fits the API?'],
      values: [
        ['a VM', 'the OS, patches, the web server', 'adding VMs by hand', 'no: all the work, no gain'],
        ['a scale set', 'the OS image and its updates', 'rules, whole VMs', 'only if it needed the OS'],
        ['App Service (chosen)', 'the code', 'instances, autoscale', 'yes: web API, slots, zones'],
        ['Container Apps', 'a container image', 'replicas, even to zero', 'yes, if it were a container'],
        ['AKS', 'clusters, node pools, upgrades', 'pods and nodes', 'no: one API is not a platform'],
        ['Functions', 'the function', 'events, per execution', 'for events: the breach alert'],
      ],
    },
    {
      id: 'ways-row',
      label: 'How the platform chose',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'chosen',
          kind: 'table',
          label: 'Each part, where it runs',
          headers: ['part', 'runs on', 'why'],
          values: [
            ['exposure API', 'App Service', 'always on, slots'],
            ['breach alert', 'Functions', 'an event, now and then'],
            ['breach workflow', 'Durable Functions', 'waits half an hour'],
            ['report filer', 'Container Apps job', 'once a day, a container'],
            ['integration runtime', 'VMs', 'Windows software'],
          ],
        },
        {
          id: 'choose-rule',
          kind: 'list',
          icon: 'scale',
          label: 'The rule of thumb',
          pattern: 'service',
          items: [
            'Run the least you can: code before containers',
            'Containers before clusters',
            'A VM only for what needs one',
          ],
        },
      ],
    },
  ],
  edges: [],
}
