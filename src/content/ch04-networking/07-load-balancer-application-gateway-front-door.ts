import type { Section } from '../types'

// Ch4 §7. Reference: Azure load-balancing options overview; Front Door, Application Gateway, Load Balancer docs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current SKUs and feature sets (WAF, caching, private-link origins) before recommending one.
export const loadBalancerApplicationGatewayFrontDoor: Section = {
  id: 'load-balancer-application-gateway-front-door',
  title: 'Load Balancer, Application Gateway and Front Door',
  scene: 'ch04-delivery',
  focus: 'edge',
  slide: `## Choosing a delivery service

### Load Balancer
- **Layer 4**: TCP and UDP, within a region
- Fast and simple, with no knowledge of HTTP

### Application Gateway
- **Layer 7**: understands HTTP, within a region
- URL routing, TLS handling, optional **WAF**

### Front Door
- **Layer 7 at the global edge**
- Caching, routing across regions, WAF, failover

### Also worth knowing
- All three **probe their backends** and stop sending to unhealthy ones
- **Traffic Manager** routes by DNS only and never sees the traffic

### How to choose
- Start from **protocol and scope**, then required features
- They can be **combined**: Front Door in front of regional origins`,
  narration:
    "Azure offers several ways to spread requests, and the choice starts with two questions: what protocol layer, and what scope? Load Balancer works at layer four. It sees TCP and UDP connections, not HTTP, which makes it fast and simple, and it works within a single region. Application Gateway works at layer seven. It understands HTTP, so it can route by URL path or host name, handle TLS, and add a web application firewall, but it is also regional. Front Door is also layer seven, but it sits at the global edge. Clients connect to a nearby point of presence, and it can cache content, route to the healthiest of several regions, and apply a web application firewall. The path in the diagram shows one possible design for our shop: the browser looks up the name, DNS points to Front Door, Front Door terminates TLS and applies protections, and the request goes to the App Service origin. These services are not exclusive. A global front door can sit in front of regional gateways. All three probe their backends and stop sending to unhealthy ones, while Traffic Manager routes by DNS alone and never sees the traffic. Choose the least that meets your needs, and justify each extra hop. Next: keeping the origin off the public internet.",
}
