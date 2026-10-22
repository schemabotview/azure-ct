"""Will every subnet still fit at the platform's busiest hour? A sizing model.

A delegated subnet in use cannot be resized, so the plan needs headroom now.
"""
from ipaddress import ip_network

RESERVED = 5
NEEDS = [  # subnet, prefix, what lands there, addresses needed at peak
    ('snet-dbx-host', '10.110.0.0/26', '16 workers + a driver', 17),
    ('snet-dbx-container', '10.110.0.64/26', '16 workers + a driver', 17),
    ('snet-pe', '10.110.1.0/24', 'one per private endpoint', 9),
    ('snet-app', '10.110.2.0/26', '10 app instances, x2 in a scale', 20),
    ('snet-shir', '10.110.3.0/27', 'two integration runtime VMs', 2),
]
for name, prefix, what, peak in NEEDS:
    usable = ip_network(prefix).num_addresses - RESERVED
    print(f'{name:19}{usable:>4} usable {peak:>3} at peak  {what}')
