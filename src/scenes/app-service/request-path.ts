import type { Scene } from '@graphlearning/flow'

// Ch3 §1 — one HTTP request through one application process. The hostname is synthetic. Configuration
// comes from the environment; the dependency call is where most real failures happen.
export const requestPath: Scene = {
  id: 'request-path',
  title: 'One request, one process, one dependency',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'request',
      kind: 'code',
      filename: 'request',
      label: `GET /products/42 HTTP/1.1
Host: contoso-shop-dev.azurewebsites.net
Accept: application/json`,
    },
    {
      id: 'handler',
      kind: 'code',
      filename: 'app.py',
      label: `import os
from flask import Flask

app = Flask(__name__)
CATALOG_URL = os.environ["CATALOG_URL"]  # configuration

@app.get("/products/<int:product_id>")
def product(product_id):
    item = fetch_item(CATALOG_URL, product_id)
    return {"id": product_id, "name": item["name"]}`,
    },
    {
      id: 'deps',
      label: 'The process depends on',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'config', label: 'Configuration', sub: 'environment variables', pattern: 'network', icon: 'wrench' },
        { id: 'catalog', label: 'Catalog store', sub: 'a dependency call', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'response',
      kind: 'code',
      filename: 'response',
      label: `HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "name": "Trail bottle"}`,
    },
  ],
  edges: [
    { source: 'request', target: 'handler', label: 'routed to' },
    { source: 'handler', target: 'deps', label: 'reads and calls' },
    { source: 'deps', target: 'response', label: 'becomes' },
  ],
}
