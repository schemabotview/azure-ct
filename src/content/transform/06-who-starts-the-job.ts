import type { Section } from '../types'

export const whoStartsTheJob: Section = {
  id: 'who-starts-the-job',
  title: 'Who starts the job',
  scene: 'who-starts-the-job',
  narration:
    "The exposure job must run after TradeBook's copy has finished, and never before. Databricks has its own scheduler, and Data Factory has its triggers, so something has to own the order. The code on the right is adf slash pipeline slash nightly dot json, the night's pipeline. Its first activity runs copy tradebook, the pipeline from Course eight, and waits for it to complete. Its second, Build Exposure, is a Databricks Job activity. It depends on the copy succeeding, connects through a new linked service, l s databricks, which signs in as the factory's own managed identity, retries once after ten minutes, and runs an existing Databricks job by its I D, passing the business date. The tumbling window trigger from Course eight now starts nightly instead of the copy alone. For that sign in to work, the factory's identity is added to the workspace, with permission to run that one job. The table at the bottom compares the two ways to start it. Data Factory waits for the TradeBook copy and for files; Databricks' scheduler waits for a time, a file arriving or a table changing. Data Factory sees the whole night, sources included; Databricks sees only Databricks. So the platform uses Data Factory for the night, where the order spans both, and Databricks' own scheduler for the intraday job that reads the stream, which needs nothing outside Databricks. One rule follows: each job has exactly one owner that starts it, or it runs twice. Next, what one night of all this costs.",
}
