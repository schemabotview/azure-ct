"""Who can reach the lake once public network access is off? A model.

The lake answers only on its private endpoint (10.110.1.4); its public
address refuses every request. A caller needs the private address (DNS) and a
route to it (peering, ExpressRoute), and then still needs a role.
"""
CALLERS = [  # who, the address their DNS gives, a route to 10.110.0.0/20?
    ('a laptop on the internet', '20.150.0.4', False),
    ('the API in snet-app', '10.110.1.4', True),
    ('TradeBook, via ExpressRoute', '10.110.1.4', True),
    ('a VM in risk-dev, not peered', '20.150.0.4', False),
]
for who, address, routed in CALLERS:
    if address != '10.110.1.4':
        verdict = 'refused: public network access is disabled'
    elif not routed:
        verdict = 'no route to the private endpoint'
    else:
        verdict = 'reaches the lake; a role decides the rest'
    print(f'{who:30}{address:12}{verdict}')
