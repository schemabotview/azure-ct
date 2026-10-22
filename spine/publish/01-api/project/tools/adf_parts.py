"""The factory's parts, read from its git folder (adf/): what starts each
pipeline, what its activities read and write, and through which connection
and runtime. With --credentials: how each connection signs in.

    python tools/adf_parts.py [--credentials]
"""
import glob
import json
import sys


def load(kind):
    resources = [json.load(open(f)) for f in sorted(glob.glob(f'adf/{kind}/*'))]
    return {r['name']: r['properties'] for r in resources}


services, datasets = load('linkedService'), load('dataset')
pipelines, triggers = load('pipeline'), load('trigger')


def via(dataset_name):
    service = datasets[dataset_name]['linkedServiceName']['referenceName']
    runtime = services[service].get('connectVia', {}).get('referenceName')
    return f'{dataset_name} > {service} > {runtime or "Azure runtime"}'


def activities(items):
    for a in items:
        yield a
        for branch in ('ifTrueActivities', 'ifFalseActivities'):
            yield from activities(a.get('typeProperties', {}).get(branch, []))


if '--credentials' in sys.argv:
    for name, s in services.items():
        p = s['typeProperties']
        secret = p.get('password', {}).get('secretName')
        how = (f"user {p['username']}, Key Vault secret {secret}"
               if secret else "the factory's managed identity")
        print(f'{name:14}{s["type"]:15}{how}')
    sys.exit()

for name, t in triggers.items():
    for run in t['pipelines'] if 'pipelines' in t else [t['pipeline']]:
        pipeline = run['pipelineReference']['referenceName']
        print(f'{name} ({t["type"]})\n  starts {pipeline}')
        for a in activities(pipelines[pipeline]['activities']):
            print(f'    {a["name"]} ({a["type"]})')
            for io, refs in (('reads', a.get('inputs', [])),
                             ('writes', a.get('outputs', []))):
                for ref in refs:
                    print(f'      {io:7}{via(ref["referenceName"])}')
