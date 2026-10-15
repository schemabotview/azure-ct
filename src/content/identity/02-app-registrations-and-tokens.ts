import type { Section } from '../types'

// Ch2 §2. Reference: Microsoft identity platform — app registrations, service principals, access tokens.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
// The decoded claims in the scene are synthetic; claim names follow the v2.0 access-token format.
export const appRegistrationsAndTokens: Section = {
  id: 'app-registrations-and-tokens',
  title: 'App registrations, service principals and tokens',
  scene: 'app-token',
  focus: 'sp',
  slide: `## Identities for applications

### Two objects, two jobs
- An **app registration** is the application's **definition**
- A **service principal** is that application's **identity in one tenant**
- Permissions and role assignments attach to the **service principal**

### Getting a token
- The application proves itself; Entra issues an **access token** for a named API

### Reading a token
- \`aud\` is the API it is **for**
- \`tid\` and \`iss\` say **who issued** it
- \`roles\` lists the **application permissions** granted
- \`exp\` is when it **expires**

### Caution
- A stored secret is a **credential to rotate**
- Decoding a token is not **validating** it`,
  narration:
    "People are not the only ones who need identities. Applications do too, and Entra gives them two related objects. An app registration is the definition of an application: its name, its identifiers, and the permissions it asks for. A service principal is that application's identity inside one specific tenant, and it is the service principal that role assignments and consent attach to. When the order service needs to call the fulfilment API, it proves itself to Entra, often with a certificate or a client secret, and receives an access token for that API. The card shows the token decoded, with made-up values. The audience claim names the API the token is meant for. The issuer and tenant say who vouched for it. The roles claim lists the application permissions it carries, and the expiry says when it stops working. Two cautions. A secret or certificate stored in the application is itself a credential that must be protected and rotated. And decoding a token to read it is not the same as validating it: the receiving API must check the signature, the audience and the expiry. Managed identities remove the secret problem, which we turn to next.",
}
