import type { Course } from '../types'
import { dataFactorysParts } from './01-data-factorys-parts'
import { aRuntimeInsideTheBank } from './02-a-runtime-inside-the-bank'
import { copyingTradebook } from './03-copying-tradebook'
import { filesThatArrive } from './04-files-that-arrive'
import { aFilesContract } from './05-a-files-contract'
import { batchCdcAndReconciliation } from './06-batch-cdc-and-reconciliation'
import { rerunsWithoutDuplicates } from './07-reruns-without-duplicates'
import { secretsAndIdentitiesForPipelines } from './08-secrets-and-identities-for-pipelines'

// Course 8 — Bring the batches in. Data Factory's parts, the runtime in the bank, a windowed copy
// of TradeBook, event-triggered files, contracts, reconciliation, idempotent reruns, and secrets.
export const batch: Course = {
  id: 'batch',
  title: 'Bring the batches in',
  sections: [
    dataFactorysParts,
    aRuntimeInsideTheBank,
    copyingTradebook,
    filesThatArrive,
    aFilesContract,
    batchCdcAndReconciliation,
    rerunsWithoutDuplicates,
    secretsAndIdentitiesForPipelines,
  ],
}
