import type { Section } from '../types'

// Ch4 §5. Reference: Azure DNS and Azure Private DNS zones; App Service custom domains.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const dnsResolutionPaths: Section = {
  id: 'dns-resolution-paths',
  title: 'Public and private DNS and resolution paths',
  scene: 'ch04-dns',
  focus: 'private',
  slide: `## Names to addresses

### Public DNS
- Maps **shop.contoso.com** to a destination
- Often a **CNAME** to the app's default hostname
- A **TXT record** proves you own a custom domain

### Private DNS
- A **private zone** answers only **linked networks**
- Private endpoints depend on it

### Reading a lookup
- The **canonical name** and **address** show the path a client will take
- The same name can answer **differently** inside and outside the VNet

### Caching
- Records have a **TTL**, so changes can take time to appear

### Debugging habit
- A wrong answer means a **wrong path**
- Check **DNS** before blaming the firewall`,
  narration:
    "Almost every connection starts with a name lookup, and many network mysteries are really DNS problems. Public DNS maps a friendly name, shop dot contoso dot com, to a destination. For our app, that is usually a CNAME record that points to the app's default hostname, which then resolves to an address. When you add a custom domain, a TXT record proves that you own it. The lookup in the code card shows the canonical name and the address, and together they tell you which path a client will take. Private DNS is the second half. A private zone answers only for the virtual networks linked to it, and private endpoints depend on it, as we will see in a moment. The consequence is subtle but important: the same name can give different answers inside your network and outside it. That is deliberate, because it lets inside clients reach a private address while everyone else gets the public one. It also means a wrong answer sends traffic down a wrong path. Records also carry a time to live, so changes can take a while to appear. So when something cannot connect, check what the name resolves to before you blame the firewall. Next, securing the connection itself.",
}
