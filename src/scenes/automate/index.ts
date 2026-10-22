import type { Scene } from '@graphlearning/flow'
import { rerun } from './rerun'
import { bicep } from './bicep'
import { modules } from './modules'
import { params } from './params'
import { whatif } from './whatif'
import { pipeline } from './pipeline'
import { dataRelease } from './data-release'
import { promotion } from './promotion'

export const automateScenes: Scene[] = [rerun, bicep, modules, params, whatif, pipeline, dataRelease, promotion]
