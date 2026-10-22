import type { Course } from '../types'
import { theExposureApi } from './01-the-exposure-api'
import { appService } from './02-app-service'
import { settingsWithoutSecrets } from './03-settings-without-secrets'
import { logsScaleAndSlots } from './04-logs-scale-and-slots'
import { otherWaysToRunIt } from './05-other-ways-to-run-it'
import { oneDoorForOtherTeams } from './06-one-door-for-other-teams'
import { breachAlerts } from './07-breach-alerts'
import { theBreachWorkflow } from './08-the-breach-workflow'
import { theMorningReportAndTheAnalysts } from './09-the-morning-report-and-the-analysts'

// Course 12 — Publish to the risk team. The exposure API, App Service, settings without secrets,
// slots and scale, other compute, API Management, the breach alert and workflow, the filer.
export const publish: Course = {
  id: 'publish',
  title: 'Publish to the risk team',
  sections: [
    theExposureApi,
    appService,
    settingsWithoutSecrets,
    logsScaleAndSlots,
    otherWaysToRunIt,
    oneDoorForOtherTeams,
    breachAlerts,
    theBreachWorkflow,
    theMorningReportAndTheAnalysts,
  ],
}
