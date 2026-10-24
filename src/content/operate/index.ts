import type { Course } from '../types'
import { metricsLogsAndTraces } from './01-metrics-logs-and-traces'
import { azureMonitorAndKql } from './02-azure-monitor-and-kql'
import { diagnosticSettingsAndTheActivityLog } from './03-diagnostic-settings-and-the-activity-log'
import { the0700Objective } from './04-the-0700-objective'
import { keysAndRotation } from './05-keys-and-rotation'
import { defenderSentinelAndWaf } from './06-defender-sentinel-and-waf'
import { anIncident } from './07-an-incident'
import { backupsThatRestore } from './08-backups-that-restore'
import { recoveryObjectives } from './09-recovery-objectives'
import { quotasAndThrottling } from './10-quotas-and-throttling'

// Course 13 — Operate it. Signals and KQL, diagnostic settings, the 07:00 objective, rotation,
// detection, a leaked token, a restore drill, recovery objectives, throttling and retries.
export const operate: Course = {
  id: 'operate',
  title: 'Operate it',
  sections: [
    metricsLogsAndTraces,
    azureMonitorAndKql,
    diagnosticSettingsAndTheActivityLog,
    the0700Objective,
    keysAndRotation,
    defenderSentinelAndWaf,
    anIncident,
    backupsThatRestore,
    recoveryObjectives,
    quotasAndThrottling,
  ],
}
