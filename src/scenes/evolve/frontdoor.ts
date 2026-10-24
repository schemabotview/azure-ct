import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/evolve/02-frontdoor/project/templates/modules/frontdoor.bicep?raw'

// Azure Front Door (Premium) can reach origins over Private Link (App Service: groupId 'sites';
// Blob Storage: 'blob'), approved on the origin. A route caches only with cacheConfiguration, and
// then honours the origin's Cache-Control; without it every request goes to the origin. The cache
// key is the path plus, by the query string setting, none or some of the query. 'Singapore' is the
// bank's office there; edge locations near it serve the cached copy.
// source: https://learn.microsoft.com/en-us/azure/frontdoor/private-link
// source: https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching
// source: https://learn.microsoft.com/en-us/azure/frontdoor/front-door-route-matching
export const frontdoor: Scene = mapFrame('front-door-caching', [...BUILT_BY[13], 'fd'], {
  id: 'fd-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'fd-code', kind: 'code', filename: 'templates/modules/frontdoor.bicep', label: code.replace(/\n+$/, ''), show: [[74, 80], [88, 97]], highlight: [76, 80, 90, 91, 95, 96], pattern: 'network' },
    {
      id: 'fd-cache',
      kind: 'table',
      label: 'What the edge may keep',
      headers: ['path', 'cached', 'why'],
      values: [
        ['/reports/2026-10-13.csv', 'yes, one copy', 'a filed report never changes'],
        ['/api/groups/G-WW/headroom', 'never', 'it changes with every deal'],
        ['/api/…/reservations', 'never', 'a POST, and it must reach the mart'],
      ],
    },
  ],
})
