"""Which route does a packet from snet-app take? Azure's choice, as a model.

The longest matching prefix wins. Between equal prefixes, a user-defined route
beats one learned by BGP, which beats a system route.
"""
from ipaddress import ip_address, ip_network

RANK = {'user': 0, 'BGP': 1, 'system': 2}
SYSTEM = [  # prefix, next hop, source
    ('10.110.0.0/20', 'VNet (local)', 'system'),
    ('10.100.0.0/22', 'peering: the hub', 'system'),
    ('10.50.0.0/16', 'gateway: ExpressRoute', 'BGP'),
    ('0.0.0.0/0', 'Internet: none (private)', 'system'),
]
UDR = [('0.0.0.0/0', 'firewall 10.100.0.68', 'user')]  # rt-risk-prod-spoke
PLACES = [('10.110.1.4', 'the lake (endpoint)'),
          ('10.50.12.7', 'TradeBook (bank)'),
          ('203.0.113.10', 'a package site')]


def pick(dest, routes):
    found = [r for r in routes if ip_address(dest) in ip_network(r[0])]
    return min(found, key=lambda r: (-ip_network(r[0]).prefixlen, RANK[r[2]]))


for title, routes in [('without a route table', SYSTEM),
                      ('with rt-risk-prod-spoke', SYSTEM + UDR)]:
    print(title)
    for dest, what in PLACES:
        prefix, hop, source = pick(dest, routes)
        print(f'  {dest:13}{what:20}{prefix:14}{source:7}{hop}')
