import type { Course } from '../types'
import { metricsLogsTracesAndCorrelation } from './01-metrics-logs-traces-and-correlation'
import { azureMonitorApplicationInsightsAndKql } from './02-azure-monitor-application-insights-and-kql'
import { diagnosticSettingsAndActivityLog } from './03-diagnostic-settings-and-activity-log'
import { slosAlertsAndOwnership } from './04-slos-alerts-and-ownership'
import { keyVaultKeysAndSecretRotation } from './05-key-vault-keys-and-secret-rotation'
import { defenderSentinelWafAndBoundaries } from './06-defender-sentinel-waf-and-boundaries'
import { incidentDiagnosisAndContainment } from './07-incident-diagnosis-and-containment'
import { azureBackupAndRestoreValidation } from './08-azure-backup-and-restore-validation'
import { rtoRpoAndRegionalFailover } from './09-rto-rpo-and-regional-failover'
import { quotasThrottlingAndResilienceValidation } from './10-quotas-throttling-and-resilience-validation'

// Chapter 11 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch11OpsSecurityRecovery: Course = {
  id: 'ch11-ops-security-recovery',
  title: 'Observability, Security, and Recovery',
  sections: [
    metricsLogsTracesAndCorrelation,
    azureMonitorApplicationInsightsAndKql,
    diagnosticSettingsAndActivityLog,
    slosAlertsAndOwnership,
    keyVaultKeysAndSecretRotation,
    defenderSentinelWafAndBoundaries,
    incidentDiagnosisAndContainment,
    azureBackupAndRestoreValidation,
    rtoRpoAndRegionalFailover,
    quotasThrottlingAndResilienceValidation,
  ],
}
