"""The platform's address plan: every range, checked for overlap and size.

Azure reserves five addresses in every subnet: the network address, three
for the platform (gateway and DNS), and the broadcast address.
"""
from ipaddress import ip_network

RESERVED = 5
PLAN = {
    'on-premises (the bank)': ('10.50.0.0/16', {}),
    'vnet-hub-uks': ('10.100.0.0/22', {
        'GatewaySubnet': '10.100.0.0/27',
        'AzureFirewallSubnet': '10.100.0.64/26',
        'snet-dns-inbound': '10.100.1.0/28'}),
    'vnet-risk-prod-uks': ('10.110.0.0/20', {
        'snet-dbx-host': '10.110.0.0/26',
        'snet-dbx-container': '10.110.0.64/26',
        'snet-pe': '10.110.1.0/24',
        'snet-app': '10.110.2.0/26',
        'snet-shir': '10.110.3.0/27'}),
    'vnet-risk-dev-uks': ('10.120.0.0/20', {}),
}

ranges = []
for vnet, (cidr, subnets) in PLAN.items():
    space = ip_network(cidr)
    print(f'{vnet:28}{cidr:18}{space.num_addresses:>7} addresses')
    for name, sub in subnets.items():
        net = ip_network(sub)
        assert net.subnet_of(space), f'{name} is outside {vnet}'
        usable = net.num_addresses - RESERVED
        print(f'  {name:26}{sub:18}{usable:>7} usable')
    ranges.append((vnet, space))

clash = [(a, b) for i, (a, x) in enumerate(ranges)
         for b, y in ranges[i + 1:] if x.overlaps(y)]
print('overlaps:', clash or 'none, so every range can be routed')
