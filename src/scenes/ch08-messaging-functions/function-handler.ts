import type { Scene } from '@graphlearning/flow'

// Ch8 §2 — one function: a trigger starts it, bindings connect inputs and outputs, the handler is
// plain code. Python v2 programming model decorators; connection names are app-setting names.
export const functionHandler: Scene = {
  id: 'ch08-function-handler',
  title: 'Trigger, handler, binding',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'function_app.py',
      label: `import azure.functions as func
app = func.FunctionApp()

@app.queue_trigger(arg_name="msg", queue_name="orders",
                   connection="StorageConn")
@app.queue_output(arg_name="out", queue_name="fulfil",
                  connection="StorageConn")
def process_order(msg: func.QueueMessage,
                  out: func.Out[str]):
    order = msg.get_json()
    out.set(str(order["order_id"]))`,
    },
    {
      id: 'flow',
      label: 'What the runtime does',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'trigger', label: 'Trigger', sub: 'a message arrives', pattern: 'service', icon: 'zap' },
        { id: 'handler', label: 'Handler', sub: 'your code runs', pattern: 'user', icon: 'code' },
        { id: 'binding', label: 'Output binding', sub: 'writes the result', pattern: 'storage', icon: 'queue' },
      ],
    },
    {
      id: 'bounds',
      label: 'Execution boundaries',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'timeout', label: 'Time limit', sub: 'varies by hosting plan', pattern: 'warn', icon: 'clock' },
        { id: 'stateless', label: 'No local state', sub: 'instances come and go', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'flow', label: 'runs as' },
    { source: 'flow', target: 'bounds', label: 'within' },
  ],
}
