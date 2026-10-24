"""Rotating TradeBook's read-only password while the nightly copy runs,
against a local PostgreSQL 16 (real password checks over TCP). A dict
stands in for the Key Vault secret tradebook-adf-reader."""
import secrets

import psycopg
from psycopg import sql

ADMIN = dict(dbname='tradebook')          # the database team's own login
vault = {}
SECRET = 'tradebook-adf-reader'


def set_password(user):
    password = secrets.token_urlsafe(18)
    with psycopg.connect(**ADMIN, autocommit=True) as db:
        db.execute(sql.SQL('ALTER ROLE {} PASSWORD {}').format(
            sql.Identifier(user), sql.Literal(password)))
    vault[SECRET] = (user, password)   # a new secret version


def connect(credential):
    user, password = credential
    try:
        conn = psycopg.connect(host='127.0.0.1', dbname='tradebook',
                               user=user, password=password)
        conn.execute('SELECT count(*) FROM trade.deals')
        return conn, 'connects'
    except psycopg.OperationalError:
        return None, 'refused: password authentication failed'


with psycopg.connect(**ADMIN, autocommit=True) as db:
    for user in ('adf_reader_blue', 'adf_reader_green'):
        role = sql.Identifier(user)
        db.execute(sql.SQL('CREATE ROLE {} LOGIN').format(role))
        db.execute(sql.SQL('GRANT USAGE ON SCHEMA trade TO {}').format(role))
        db.execute(sql.SQL('GRANT SELECT ON trade.deals TO {}').format(role))

for how, users in (('one login', ['adf_reader_blue'] * 2),
                   ('two logins, in turn', ['adf_reader_blue',
                                            'adf_reader_green'])):
    set_password(users[0])
    running, _ = connect(vault[SECRET])  # the copy starts
    cached = vault[SECRET]               # a runtime's copy
    set_password(users[1])                               # the rotation
    print(f'{how}:')
    still = running.execute('SELECT 1').fetchone()
    print(f"  the running copy:          {'still reading' if still else ''}")
    print(f'  a retry with the old copy: {connect(cached)[1]}')
    print(f"  a new run, new secret:     {connect(vault[SECRET])[1]}")
    running.close()
