import type { Scene } from '@graphlearning/flow'
import { addresses } from './addresses'
import { spoke } from './spoke'
import { routes } from './routes'
import { filters } from './filters'
import { names } from './names'
import { tls } from './tls'
import { endpoints } from './endpoints'
import { gateways } from './gateways'
import { hybrid } from './hybrid'

export const networkScenes: Scene[] = [addresses, spoke, routes, filters, names, tls, endpoints, gateways, hybrid]
