"""Will the clusters fit the spoke? With VNet injection every cluster node
takes one address in snet-dbx-host and one in snet-dbx-container, so the
smaller subnet caps how many nodes can run at once. A model.
"""
import ipaddress

SUBNETS = {'snet-dbx-host': '10.110.0.0/26',
           'snet-dbx-container': '10.110.0.64/26'}
usable = min(ipaddress.ip_network(p).num_addresses - 5  # Azure keeps 5
             for p in SUBNETS.values())
CLUSTERS = {  # name: (clusters, workers each, when)
    'overnight job': (1, 16, 'night'),
    'intraday job': (1, 2, 'day'),
    'engineers, ad hoc': (3, 4, 'day'),
}
print(f'{usable} addresses usable in each subnet')
at = {'night': 0, 'day': 0}
for name, (count, workers, when) in CLUSTERS.items():
    nodes = count * (workers + 1)  # each cluster has a driver too
    at[when] += nodes
    print(f'  {name:20}{nodes:3} nodes, {when}')
busiest = max(at.values())
print(f'busiest: {busiest} nodes at once, {usable - busiest} addresses spare')
