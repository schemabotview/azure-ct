"""Running infra/05-network.sh again, a month later: a model of what happens.

Resource Manager creates or updates on every PUT, so a rerun duplicates
nothing. But a script only says what to do, not what should exist: it never
removes, and it cannot tell what someone else changed.
"""
LIVE = {  # what risk-prod's spoke holds today
    'snet-dbx-host': '10.110.0.0/26', 'snet-dbx-container': '10.110.0.64/26',
    'snet-pe': '10.110.1.0/24', 'snet-app': '10.110.2.0/26',
    'snet-shir': '10.110.3.0/27',
    'snet-test': '10.110.9.0/27',    # added by hand in the portal
}
IN_USE = {'snet-app'}                # App Service is joined to it
SCRIPT = {  # the script, edited: snet-app widened, snet-shir removed
    'snet-dbx-host': '10.110.0.0/26', 'snet-dbx-container': '10.110.0.64/26',
    'snet-pe': '10.110.1.0/24', 'snet-app': '10.110.2.0/25',
}

for name in sorted(LIVE | SCRIPT):
    want, have = SCRIPT.get(name), LIVE.get(name)
    if want == have:
        result = 'unchanged: the same PUT again'
    elif want and not have:
        result = 'created'
    elif want and name in IN_USE:
        result = f'refused: in use, {have} cannot become {want}'
    elif want:
        result = f'updated to {want}'
    else:
        result = 'left alone: not in the script'
    print(f'{name:20}{result}')
