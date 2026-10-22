import type { Scene, SceneNode } from '@graphlearning/flow'

// Azure's load-balancing choices: Load Balancer (layer 4, regional or cross-region), Application
// Gateway (layer 7, regional, path routing, WAF, private or public front end), Front Door (layer 7,
// global edge, WAF, caching, public front end), Traffic Manager (DNS-based, global). The exposure
// dashboard is web traffic for analysts in London and Singapore.
// source: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/load-balancing-overview
// source: https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview
// source: https://learn.microsoft.com/en-us/azure/application-gateway/overview
const option = (id: string, label: string, sub: string, icon: string, items: string[]): SceneNode => ({
  id, label, sub, icon, pattern: 'network', kind: 'list', items,
})

export const gateways: Scene = {
  id: 'front-door-choice',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'options',
      label: 'Four ways in front of an app',
      bare: true,
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [
        option('lb', 'Load Balancer', 'layer 4 · TCP and UDP', 'loadbalancer', ['Regional: one Region', 'Ports, not URLs', 'No certificates, no WAF', 'Inside a VNet or public']),
        option('agw', 'Application Gateway', 'layer 7 · HTTP', 'appgateway', ['Regional: one Region', 'Routes by host and path', 'Ends TLS; WAF optional', 'Private or public front end']),
        option('fd', 'Front Door', 'layer 7 · global edge', 'frontdoor', ['Global: the nearest edge', 'Caching, WAF, TLS at the edge', 'Public front end only', 'Origins can be private (Private Link)']),
        option('tm', 'Traffic Manager', 'DNS · global', 'trafficmanager', ['Answers DNS, carries nothing', 'Picks a Region per lookup', 'No TLS, no caching', 'Fails over by health probe']),
      ],
    },
    {
      id: 'choice-row',
      label: 'The choice for the dashboard',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'needs',
          kind: 'table',
          label: 'What the dashboard needs',
          headers: ['need', 'rules out'],
          values: [
            ['HTTP, by URL', 'Load Balancer'],
            ['TLS and a WAF in front', 'Traffic Manager'],
            ['readers in London and Singapore', '—'],
            ['a private API behind it', 'nothing: all can reach a private origin'],
          ],
        },
        {
          id: 'answer',
          kind: 'table',
          label: 'The answer, in two steps',
          headers: ['when', 'front'],
          values: [
            ['now: London only, internal', 'Application Gateway, private'],
            ['Course 14: Singapore joins', 'Front Door, origin over Private Link'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
