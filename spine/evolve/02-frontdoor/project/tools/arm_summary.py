"""What a compiled ARM template declares: each resource, its API version,
what it waits for, and the modules Bicep turned into nested deployments."""
import json
import sys


def show(template, indent=''):
    resources = template['resources']
    if isinstance(resources, dict):          # languageVersion 2.0
        resources = list(resources.values())
    for r in resources:
        # a dependency is a symbolic name, or resourceId('<type>', ...)
        after = ', '.join(d.split("'")[1].rsplit('/', 1)[-1] if "'" in d else d
                          for d in r.get('dependsOn', []))
        line = f"{indent}{r['type']}@{r['apiVersion']}"
        print(line + (f'  after: {after}' if after else ''))
        if r['type'] == 'Microsoft.Resources/deployments':
            show(r['properties']['template'], indent + '  ')


template = json.load(open(sys.argv[1]))
schema = template['$schema'].rsplit('/', 1)[-1].split('.')[0]
print(f"{schema}, {len(template.get('parameters', {}))} parameters")
show(template)
