import type { Scene } from '@graphlearning/flow'

// Ch8 §8 — a durable orchestration: the orchestrator is replayed from history, so it must be
// deterministic; every side effect lives in an activity. Failure after payment triggers a
// compensation. Python v2 decorators.
export const orchestration: Scene = {
  id: 'orchestration',
  title: 'An order workflow with compensation',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'orch',
      kind: 'code',
      filename: 'orchestrator (Durable Functions)',
      label: `@app.orchestration_trigger(context_name="context")
def order_orchestrator(context):
    order = context.get_input()
    yield context.call_activity("reserve_stock", order)
    try:
        yield context.call_activity("charge_payment", order)
    except Exception:
        yield context.call_activity("release_stock", order)
        raise
    yield context.call_activity("create_shipment", order)`,
    },
    {
      id: 'steps',
      label: 'Activities do the real work',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'reserve', label: 'Reserve stock', sub: 'activity', pattern: 'service', icon: 'boxes' },
        { id: 'charge', label: 'Charge payment', sub: 'activity, may fail', pattern: 'warn', icon: 'receipt' },
        { id: 'release', label: 'Release stock', sub: 'compensation', pattern: 'network', icon: 'repeat' },
        { id: 'ship', label: 'Create shipment', sub: 'activity', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'choice',
      kind: 'table',
      label: 'Orchestration tools',
      headers: ['Tool', 'You write', 'Best for'],
      values: [
        ['Durable Functions', 'code', 'complex logic, tests, source control'],
        ['Logic Apps', 'a visual workflow', 'integration with many connectors'],
      ],
    },
  ],
  edges: [
    { source: 'orch', target: 'steps', label: 'calls' },
    { source: 'steps', target: 'choice', label: 'built with' },
  ],
}
