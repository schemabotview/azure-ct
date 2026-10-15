import type { Scene } from '@graphlearning/flow'

// Ch8 §1 — API Management as the front door for APIs: contract, authentication, policy, throttling.
// The policy is a trimmed inbound section; element names follow the APIM policy reference.
export const apim: Scene = {
  id: 'apim',
  title: 'An API gateway in front of the backend',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    { id: 'client', label: 'Partner app', sub: 'calls /orders', pattern: 'user', icon: 'users' },
    {
      id: 'gateway',
      label: 'API Management',
      sub: 'one front door',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'contract', label: 'Contract', sub: 'OpenAPI definition', pattern: 'network', icon: 'file' },
        { id: 'auth', label: 'Authentication', sub: 'validate the token', pattern: 'user', icon: 'key' },
        { id: 'policy', label: 'Policies', sub: 'transform, cache, log', pattern: 'service', icon: 'policy' },
        { id: 'throttle', label: 'Throttling', sub: 'per caller limits', pattern: 'warn', icon: 'gauge' },
      ],
    },
    {
      id: 'rules',
      kind: 'code',
      filename: 'inbound policy (trimmed)',
      label: `<inbound>
  <validate-jwt header-name="Authorization"
                failed-validation-httpcode="401">
    <openid-config url="<entra-openid-config-url>" />
  </validate-jwt>
  <rate-limit calls="100" renewal-period="60" />
</inbound>`,
    },
    { id: 'backend', label: 'Order API', sub: 'the backend', pattern: 'service', icon: 'appservice' },
  ],
  edges: [
    { source: 'client', target: 'gateway', label: 'HTTPS' },
    { source: 'gateway', target: 'rules', label: 'configured by' },
    { source: 'rules', target: 'backend', label: 'then forwards' },
  ],
}
