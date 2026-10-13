import type { Section } from '../types'

// Ch8 §1. Reference: Azure API Management overview and policy reference (validate-jwt, rate-limit).
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm policy element names and attributes, and the current tiers (including consumption and v2) and their feature differences.
export const apiManagement: Section = {
  id: 'api-management',
  title: 'API Management: contracts, authentication, policies and throttling',
  scene: 'ch08-apim',
  focus: 'gateway',
  slide: `## One front door for APIs

### What the gateway does
- Publishes a **contract**, usually an OpenAPI definition
- **Authenticates** callers before the backend sees them
- Applies **policies**: transform, cache, log
- **Throttles** each caller
- Offers **versions**, so old clients keep working

### Why not in the backend
- The rules live in **one place**
- Backends stay **simple** and can change behind a stable URL

### Boundaries
- The gateway does **not** fix a **slow backend**
- Keep the backend **private**, reachable only from the gateway
- Authorisation of **specific data** still belongs in the backend`,
  narration:
    "When other teams or partners call your API, you do not want every backend to reinvent authentication, rate limits and versioning. API Management is a gateway that sits in front of the backends and does those jobs once. In the diagram a partner app calls slash orders. The gateway publishes the contract, usually an OpenAPI definition, so callers know what to expect. It authenticates the caller before the backend sees the request, and it applies policies: transforming a message, caching a response, logging the call. The card shows a trimmed policy. It validates the bearer token against Entra, rejecting a bad one with a 401, and it limits each caller to a hundred calls per minute. It can also expose versions, so old clients keep working. Because the rules live in one place, backends stay simple and can change behind a stable address. Be realistic about the limits. A gateway does not fix a slow backend. You should keep the backend private so that it can only be reached through the gateway. And decisions about which data a given caller may see still belong in the backend. Behind the gateway, much of our logic can run as small functions.",
}
