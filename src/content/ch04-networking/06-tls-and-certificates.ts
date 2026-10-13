import type { Section } from '../types'

// Ch4 §6. Reference: TLS and certificate handling in Azure Front Door, Application Gateway and App Service.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const tlsAndCertificates: Section = {
  id: 'tls-and-certificates',
  title: 'TLS, certificates and encryption across hops',
  scene: 'ch04-tls',
  focus: 'hops',
  slide: `## Encryption across hops

### TLS
- Gives **encryption, server identity and integrity**
- The client checks the certificate **name, chain and expiry**

### Termination
- A front end **terminates** TLS, then opens a **new** connection to the origin
- **Re-encrypt** to the origin so the back half is not plain text

### Typical failures
- **Name mismatch**: the certificate is for another hostname
- **Expired** certificate, or an **untrusted chain**
- Some services also demand a **client** certificate

### Where certificates live
- **Managed** certificates where offered
- Others in **Key Vault**, with someone **owning renewal**
- **Alert** before certificates expire`,
  narration:
    "Transport Layer Security, or TLS, gives a connection three things: encryption, proof of the server's identity, and protection against tampering. The proof comes from a certificate, and the client checks three things about it: that the name matches the host it asked for, that the certificate chains to an authority it trusts, and that it has not expired. Now a request usually crosses several connections, and TLS is per connection. In the table, the browser connects to a front end, which terminates that connection. The front end then opens a new connection to the app, and the app opens another to the database. Each leg has its own certificate check. A common mistake is to terminate at the edge and leave the back half in plain text, so re-encrypt to the origin. The failures are predictable. A name mismatch means the certificate belongs to another hostname. An expired certificate, or an untrusted chain, breaks the connection outright. Set a minimum TLS version too. So decide where certificates live. Managed certificates renew themselves where they are offered, and others live in Key Vault, but in every case somebody must own renewal. Now, which service should receive the traffic first?",
}
