import type { Scene } from '@graphlearning/flow'
import { cidr } from './cidr'
import { vnetSubnets } from './vnet-subnets'
import { routesOutbound } from './routes-outbound'
import { nsg } from './nsg'
import { dns } from './dns'
import { tls } from './tls'
import { delivery } from './delivery'
import { privateAccess } from './private-access'
import { hubSpoke } from './hub-spoke'

// One bundle per course folder, spread into src/scenes/index.ts.
export const networkingScenes: Scene[] = [cidr, vnetSubnets, routesOutbound, nsg, dns, tls, delivery, privateAccess, hubSpoke]
