"""The bank's limits system, which approves a new limit or a temporary
excess. It is on-premises, reached over ExpressRoute, and accepts only an API
key, which App Service reads from Key Vault into LIMITS_SERVICE_KEY."""
import json
import os
import urllib.request

LIMITS = 'https://limits.woodgrovebank.example/api/v2'


def request_excess(group, amount_musd, reason):
    body = json.dumps({'group': group, 'amount_musd': amount_musd,
                       'reason': reason}).encode()
    call = urllib.request.Request(
        f'{LIMITS}/excess-requests', data=body, method='POST',
        headers={'Content-Type': 'application/json',
                 'X-Api-Key': os.environ['LIMITS_SERVICE_KEY']})
    with urllib.request.urlopen(call, timeout=10) as reply:
        return json.load(reply)
