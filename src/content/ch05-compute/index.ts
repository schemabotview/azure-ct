import type { Course } from '../types'
import { computeDecisions } from './01-compute-decisions'
import { virtualMachines } from './02-virtual-machines'
import { scaleSets } from './03-scale-sets'
import { containerImagesAndRegistries } from './04-container-images-and-registries'
import { azureContainerApps } from './05-azure-container-apps'
import { aksAndKubernetes } from './06-aks-and-kubernetes'
import { autoscalingAndGracefulReplacement } from './07-autoscaling-and-graceful-replacement'

// Chapter 5 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch05Compute: Course = {
  id: 'ch05-compute',
  title: 'Compute Alternatives and Elastic Capacity',
  sections: [
    computeDecisions,
    virtualMachines,
    scaleSets,
    containerImagesAndRegistries,
    azureContainerApps,
    aksAndKubernetes,
    autoscalingAndGracefulReplacement,
  ],
}
