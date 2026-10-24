"""Run KQL against the Kusto emulator, which speaks the same query language
as Log Analytics. `load` creates a table shaped like Application Insights'
AppRequests and loads a sample of the API's requests into it.

    python tools/kql.py load data/app_requests_20261015.csv
    python tools/kql.py kql/<query>.kql
"""
import json
import os
import sys
import urllib.request

URL, DB = os.environ.get('KUSTO_URL', 'http://localhost:8080'), 'risk'


def call(kind, text, db=DB):
    body = json.dumps({'db': db, 'csl': text}).encode()
    headers = {'Content-Type': 'application/json'}
    request = urllib.request.Request(f'{URL}/v1/rest/{kind}', data=body,
                                     headers=headers)
    with urllib.request.urlopen(request) as reply:
        return json.load(reply)['Tables'][0]


if sys.argv[1] == 'load':
    call('mgmt', f'.create database {DB} volatile', db='NetDefaultDB')
    call('mgmt', '.create table AppRequests (TimeGenerated: datetime, '
         'Name: string, ResultCode: int, DurationMs: real, Success: bool, '
         'AppRoleInstance: string)')
    rows = open(sys.argv[2]).read().splitlines()[1:]
    call('mgmt', '.ingest inline into table AppRequests <|\n' + '\n'.join(rows))
    count = call('query', 'AppRequests | count')['Rows'][0][0]
    print(f'AppRequests: {count} rows')
else:
    table = call('query', open(sys.argv[1]).read())
    names = [c['ColumnName'] for c in table['Columns']]
    print('  '.join(f'{n:>8}' for n in names))
    for row in table['Rows']:
        print('  '.join(f'{v:>8}' for v in row))
