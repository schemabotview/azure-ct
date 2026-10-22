"""Does nsg-snet-pe let this flow in? Network security group rules, as a model.

Rules are read lowest priority number first; the first match decides. The
three default rules sit at the bottom, and AllowVnetInBound lets the whole
VirtualNetwork tag in unless a rule above it says otherwise.
"""
from ipaddress import ip_address, ip_network

VNET_TAG = ['10.110.0.0/20', '10.100.0.0/22', '10.50.0.0/16']  # + peers
RULES = [  # priority, name, from, port, access
    (100, 'app-to-mart', ['10.110.2.0/26'], '5432', 'Allow'),
    (110, 'databricks-to-pe', ['10.110.0.0/25'], '443', 'Allow'),
    (120, 'shir-to-lake', ['10.110.3.0/27'], '443', 'Allow'),
    (4096, 'deny-other-vnet', VNET_TAG, '*', 'Deny'),
    (65000, 'AllowVnetInBound', VNET_TAG, '*', 'Allow'),
    (65500, 'DenyAllInBound', ['0.0.0.0/0'], '*', 'Deny'),
]
FLOWS = [('10.110.2.9', '5432', 'the API to the risk mart'),
         ('10.110.0.12', '443', 'a Databricks node to the lake'),
         ('10.110.3.4', '443', 'the integration VM to the lake'),
         ('10.110.3.4', '5432', 'the integration VM to the mart'),
         ('10.50.12.7', '5432', 'TradeBook to the mart'),
         ('203.0.113.50', '443', 'the internet to the lake')]

for source, port, what in FLOWS:
    for prio, name, froms, ports, access in RULES:
        if any(ip_address(source) in ip_network(f) for f in froms) \
                and ports in ('*', port):
            print(f'{what:32}{port:>5}  {access.lower():6}{prio:>6} {name}')
            break
print('a reply to an allowed flow goes back out: the rules are stateful')
