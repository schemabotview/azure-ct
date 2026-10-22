import type { Section } from '../types'

export const reachingTheLake: Section = {
  id: 'reaching-the-lake',
  title: 'Reaching the lake',
  scene: 'dbx-lake',
  narration:
    "A Spark job needs to read bronze and write silver and gold, and nobody should hand it a key. The editor shows the Databricks module's two halves that make that work. The access connector has a system assigned managed identity. A role assignment gives that identity Storage Blob Data Contributor on the lake, one of the two roles the deployment identity may grant. The terminal compiles the module and lists what it declares: the access connector, the workspace, a private endpoint for the workspace, which the clusters use to reach the control plane, and the role assignment, after the access connector. The table on the right follows the chain from that Azure role to a person reading a file. The connector's identity, in Azure, from this module. Storage Blob Data Contributor, in Azure, on the lake. Then, inside Databricks, a storage credential made from the connector; an external location, which is a path in the lake using that credential; and a grant on that location, such as read files, to a group. The last three are Unity Catalog, which the Databricks course teaches; this course's part is that only one identity in Azure ever holds a role on the lake. The list underneath says why that matters. Only the connector holds a lake role. There are no keys and no shared access signatures in any notebook. Who reads what is decided by Unity Catalog grants, which are visible in one place. And taking someone's access away is one revoke. Next, the secrets Databricks still needs, and the people who use it.",
}
