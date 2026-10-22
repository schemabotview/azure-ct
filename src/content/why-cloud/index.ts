import type { Course } from '../types'
import { theRiskQuestion } from './01-the-risk-question'
import { oneTeamFiveSources } from './02-one-team-five-sources'
import { rentingInsteadOfOwning } from './03-renting-instead-of-owning'
import { managedServices } from './04-managed-services'
import { sharedResponsibility } from './05-shared-responsibility'
import { whatWeWillBuild } from './06-what-we-will-build'

// Course 1 — Why the cloud. The picture before any command: the bank's risk question, what renting
// capacity and services changes, who is responsible for what, and the finished platform as the map.
export const whyCloud: Course = {
  id: 'why-cloud',
  title: 'Why the cloud',
  sections: [theRiskQuestion, oneTeamFiveSources, rentingInsteadOfOwning, managedServices, sharedResponsibility, whatWeWillBuild],
}
