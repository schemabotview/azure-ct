"""Azure Policy's deny rules, as a model, against proposed resources.

Definitions are the built-in Allowed locations (word for word) with the
platform's assignment, and the custom storage rule. Only the conditions and
aliases these two use are modelled; Azure evaluates far more.
"""
import json
from pathlib import Path

ALIAS = {'Microsoft.Storage/storageAccounts/publicNetworkAccess':
         'properties.publicNetworkAccess'}
OPS = {'equals': lambda v, w: v == w, 'notEquals': lambda v, w: v != w,
       'in': lambda v, w: v in w, 'notIn': lambda v, w: v not in w}


def field(resource, name):
    value = resource
    for part in ALIAS.get(name, name).split('.'):
        value = value.get(part) if isinstance(value, dict) else None
    return value   # None: the property is not in the request


def holds(cond, resource, params):
    if 'allOf' in cond:
        return all(holds(c, resource, params) for c in cond['allOf'])
    if 'anyOf' in cond:
        return any(holds(c, resource, params) for c in cond['anyOf'])
    op = next(k for k in cond if k in OPS)
    want = cond[op]
    if isinstance(want, str) and want.startswith("[parameters('"):
        want = params[want[len("[parameters('"):-len("')]")]]
    return OPS[op](field(resource, cond['field']), want)


def definition(path, params=None):
    p = json.loads(Path(path).read_text())['properties']
    return p['displayName'], p['mode'], p['policyRule']['if'], params or {}


uk = json.loads(Path('policies/uk-only.assignment.json').read_text())
params = {k: v['value'] for k, v in uk['properties']['parameters'].items()}
POLICIES = [definition('policies/builtin/allowed-locations.json', params),
            definition('policies/storage-private.json')]

for r in json.loads(Path('tools/proposed/requests.json').read_text()):
    verdict = 'allowed'
    for name, mode, rule, p in POLICIES:
        # an Indexed definition does not evaluate resource groups
        if mode == 'Indexed' and r['type'].endswith('/resourceGroups'):
            continue
        if holds(rule, r, p):
            verdict = f'denied: {name}'
            break
    print(f"{r['name']:17}{r['location']:12}{verdict}")
