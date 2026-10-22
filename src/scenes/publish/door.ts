import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/publish/06-door/project/policies/apim/exposure-api.xml?raw'
import session from '../../../spine/publish/06-door/session.txt?raw'

// API Management: a gateway in front of APIs, with products and subscriptions per consumer, and
// policies run on each request: validate-jwt checks a token's signature, audience and claims;
// rate-limit-by-key counts calls per key over a renewal period and answers 429 with Retry-After.
// Standard v2 is a classic-free tier with VNet integration for outbound calls.
// source: https://learn.microsoft.com/en-us/azure/api-management/validate-jwt-policy
// source: https://learn.microsoft.com/en-us/azure/api-management/rate-limit-by-key-policy
// source: https://learn.microsoft.com/en-us/azure/api-management/v2-service-tiers-overview
export const door: Scene = mapFrame('one-door', [...BUILT_BY[11], 'app', 'apim'], {
  id: 'door-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'door-policy', kind: 'code', filename: 'policies/apim/exposure-api.xml', label: code.replace(/\n+$/, ''), show: [[3, 7], [9, 19]], highlight: [6, 10, 14, 18], pattern: 'service' },
    { id: 'door-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a model of the policy', label: session.replace(/\n+$/, '') },
    {
      id: 'door-gives',
      kind: 'table',
      label: 'What the door gives other teams',
      headers: ['', 'how'],
      values: [
        ['a contract', 'the routes, published, versioned'],
        ['a key each', 'one subscription per team'],
        ['sign-in', 'an Entra token, Exposure.Read'],
        ['fair share', '60 calls a minute per team'],
      ],
    },
  ],
})
