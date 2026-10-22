import type { Course } from '../types'
import { addressesCidrAndPorts } from './01-addresses-cidr-and-ports'
import { aSpokeForThePlatform } from './02-a-spoke-for-the-platform'
import { routesAndOutboundAccess } from './03-routes-and-outbound-access'
import { networkSecurityGroups } from './04-network-security-groups'
import { namesInsideAndOutside } from './05-names-inside-and-outside'
import { tlsAlongThePath } from './06-tls-along-the-path'
import { privateEndpointsAndServiceEndpoints } from './07-private-endpoints-and-service-endpoints'
import { loadBalancerApplicationGatewayOrFrontDoor } from './08-load-balancer-application-gateway-or-front-door'
import { reachingTheBank } from './09-reaching-the-bank'

// Course 5 — Give it a network. An address plan, a private spoke, routes, filters, names, TLS,
// private endpoints, the front of the dashboard and the link to the bank.
export const network: Course = {
  id: 'network',
  title: 'Give it a network',
  sections: [
    addressesCidrAndPorts,
    aSpokeForThePlatform,
    routesAndOutboundAccess,
    networkSecurityGroups,
    namesInsideAndOutside,
    tlsAlongThePath,
    privateEndpointsAndServiceEndpoints,
    loadBalancerApplicationGatewayOrFrontDoor,
    reachingTheBank,
  ],
}
