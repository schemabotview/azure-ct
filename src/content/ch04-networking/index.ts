import type { Course } from '../types'
import { ipAddressingCidrAndPorts } from './01-ip-addressing-cidr-and-ports'
import { virtualNetworksAndSubnets } from './02-virtual-networks-and-subnets'
import { routesAndOutboundConnectivity } from './03-routes-and-outbound-connectivity'
import { networkSecurityGroups } from './04-network-security-groups'
import { dnsResolutionPaths } from './05-dns-resolution-paths'
import { tlsAndCertificates } from './06-tls-and-certificates'
import { loadBalancerApplicationGatewayFrontDoor } from './07-load-balancer-application-gateway-front-door'
import { privateEndpointsAndVnetIntegration } from './08-private-endpoints-and-vnet-integration'
import { peeringHubSpokeAndHybridNetworks } from './09-peering-hub-spoke-and-hybrid-networks'

// Chapter 4 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch04Networking: Course = {
  id: 'ch04-networking',
  title: 'Networking and Request Delivery',
  sections: [
    ipAddressingCidrAndPorts,
    virtualNetworksAndSubnets,
    routesAndOutboundConnectivity,
    networkSecurityGroups,
    dnsResolutionPaths,
    tlsAndCertificates,
    loadBalancerApplicationGatewayFrontDoor,
    privateEndpointsAndVnetIntegration,
    peeringHubSpokeAndHybridNetworks,
  ],
}
