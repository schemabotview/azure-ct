import type { Scene } from '@graphlearning/flow'

// Ch2 §2 — an app registration is the definition; a service principal is that app's identity inside
// one tenant. The claims are a DECODED access token, synthetic values, shown for illustration.
export const appToken: Scene = {
  id: 'ch02-app-token',
  title: 'An application asks for a token',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    { id: 'orders-app', label: 'Order service', sub: 'a running application', pattern: 'service', icon: 'appservice' },
    {
      id: 'tenant',
      label: 'Entra tenant',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'reg', label: 'App registration', sub: 'the definition', pattern: 'user', icon: 'appregistration' },
        { id: 'sp', label: 'Service principal', sub: 'its identity here', pattern: 'user', icon: 'enterpriseapps' },
      ],
    },
    {
      id: 'claims',
      kind: 'code',
      filename: 'access token (decoded)',
      label: `{
  "iss": "https://login.microsoftonline.com/<tenant-id>/v2.0",
  "aud": "api://fulfilment",
  "tid": "<tenant-id>",
  "azp": "<client-id>",
  "roles": ["Orders.Read"],
  "exp": 1760000000
}`,
    },
    { id: 'api', label: 'Fulfilment API', sub: 'checks aud and roles', pattern: 'service', icon: 'apim' },
  ],
  edges: [
    { source: 'orders-app', target: 'tenant', label: 'asks for a token' },
    { source: 'tenant', target: 'claims', label: 'issues' },
    { source: 'claims', target: 'api', label: 'bearer' },
  ],
}
