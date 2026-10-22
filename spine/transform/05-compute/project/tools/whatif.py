"""What `az deployment group what-if` reports for rg-risk-prod-data: a model.

Resource Manager compares the template with what exists, resource by
resource. Incremental mode (the default) leaves anything the template does
not mention alone; complete mode deletes it.
"""
TEMPLATE = {  # four of the resources main.bicep puts in the group
    'stwgriskprod': {'sku': 'Standard_ZRS', 'minimumTlsVersion': 'TLS1_2'},
    'kv-wg-risk-prod': {'sku': 'standard'},
    'vm-wg-shir-prod-1': {'zone': '1'},
    'vm-wg-shir-prod-2': {'zone': '3'},
}
LIVE = {  # what is there: one setting changed and one account made by hand
    'stwgriskprod': {'sku': 'Standard_ZRS', 'minimumTlsVersion': 'TLS1_0'},
    'kv-wg-risk-prod': {'sku': 'standard'},
    'stwgscratch': {'sku': 'Standard_LRS'},
}
SYMBOL = {'Create': '+', 'Modify': '~', 'NoChange': '=', 'Ignore': '*',
          'Delete': '-'}

for mode in ('Incremental', 'Complete'):
    print(f'{mode}:')
    for name in sorted(TEMPLATE | LIVE):
        want, have = TEMPLATE.get(name), LIVE.get(name)
        diff = ''
        if want and not have:
            change = 'Create'
        elif want == have:
            change = 'NoChange'
        elif want:
            change = 'Modify'
            diff = ', '.join(f'{k}: {have[k]} => {v}'
                             for k, v in want.items() if have.get(k) != v)
        else:
            change = 'Delete' if mode == 'Complete' else 'Ignore'
        print(f'  {SYMBOL[change]} {name:19}{change:9}{diff}'.rstrip())
