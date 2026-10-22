"""How the lake's name resolves from three places: a model of public DNS,
Azure DNS with a linked private zone, and the bank's forwarder.

The public chain is shortened and its last address is illustrative.
"""
NAME = 'stwgriskprod.blob.core.windows.net'
LINK = 'stwgriskprod.privatelink.blob.core.windows.net'
PUBLIC = {NAME: ('CNAME', LINK), LINK: ('A', '20.150.0.4')}
PRIVATE_ZONE = {LINK: ('A', '10.110.1.4')}  # privatelink.blob.core.windows.net
LINKED = {'vnet-risk-prod-uks', 'vnet-hub-uks'}  # VNets linked to the zone

PLACES = [
    ('a laptop on the internet', None),
    ('the API in snet-app', 'vnet-risk-prod-uks'),
    # the bank's DNS forwards core.windows.net to the hub's inbound endpoint
    ('TradeBook, on-premises', 'vnet-hub-uks'),
]
for who, vnet in PLACES:
    name, steps = NAME, []
    while True:
        private = vnet in LINKED and name in PRIVATE_ZONE
        kind, value = (PRIVATE_ZONE if private else PUBLIC)[name]
        where = ' (private zone)' if private else ' (public)' * (kind == 'A')
        steps.append(f'{kind} {value}{where}')
        if kind == 'A':
            break
        name = value
    print(who)
    for step in steps:
        print(f'  {step}')
