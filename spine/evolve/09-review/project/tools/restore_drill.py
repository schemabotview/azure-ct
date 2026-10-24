"""A restore drill on the local PostgreSQL 16: back the mart up, make the
mistake, restore to a NEW database and check it before anyone uses it.

On Azure the backup is the server's own (14 days, point in time) and the
restore makes a new server: infra/13-restore-drill.sh. pg_dump and
pg_restore stand in for both; what the drill checks is the same.
"""
import subprocess
import tempfile

import psycopg

CHECK = ('SELECT group_id, headroom_musd FROM mart.headroom '
         'ORDER BY group_id')


def rows(dbname):
    with psycopg.connect(dbname=dbname) as db:
        return db.execute(CHECK).fetchall()


def run(*cmd):
    subprocess.run(cmd, check=True)


before = rows('riskmart')
backup = tempfile.mktemp(suffix='.dump')
run('pg_dump', '--format=custom', '--file', backup, 'riskmart')
print('1 backup taken    mart.headroom', len(before), 'groups')

with psycopg.connect(dbname='riskmart', autocommit=True) as db:
    gone = db.execute('DELETE FROM mart.exposure').rowcount
print('2 the mistake     DELETE FROM mart.exposure:', gone, 'rows')
print('                  mart.headroom', len(rows('riskmart')), 'groups')

run('createdb', 'riskmart_drill')
run('pg_restore', '--dbname', 'riskmart_drill', backup)
print('3 restored to     riskmart_drill (a new database)')

after = rows('riskmart_drill')
print('4 check           mart.headroom', len(after), 'groups,',
      'same as before' if after == before else 'DIFFERENT')
for group, headroom in after:
    print(f'                  {group:7}{headroom:5}')

run('dropdb', 'riskmart_drill')
print('5 drill over      riskmart_drill deleted')
