"""Two dealers reserve headroom for Wide World Group at the same moment: 1.00
each, against 1.60 left. Each transaction checks the headroom, then inserts
its reservation. Run twice against the risk mart (PostgreSQL 16, local),
stepping the two transactions in the same interleaved order each time.
"""
import psycopg
from psycopg import errors

CHECK = "SELECT headroom_musd FROM mart.headroom WHERE group_id = 'G-WW'"
HOLD = "INSERT INTO mart.reservations VALUES (%s, 'G-WW', 1.00)"


def run(isolation):
    a, b = (psycopg.connect(dbname='riskmart') for _ in range(2))
    for conn in (a, b):
        conn.isolation_level = isolation
    print(f'{isolation.name}:')
    print(f'  A sees {a.execute(CHECK).fetchone()[0]}, B sees '
          f'{b.execute(CHECK).fetchone()[0]}: both enough for 1.00')
    a.execute(HOLD, ('R-A',))
    a.commit()
    print('  A holds 1.00, commits')
    try:
        b.execute(HOLD, ('R-B',))
        b.commit()
        print('  B holds 1.00, commits')
    except errors.SerializationFailure:
        b.rollback()
        print('  B refused: could not serialize; it rechecks and finds '
              f'{b.execute(CHECK).fetchone()[0]}')
    with psycopg.connect(dbname='riskmart') as c:
        print(f'  headroom now {c.execute(CHECK).fetchone()[0]}')
        c.execute('DELETE FROM mart.reservations')
    a.close(), b.close()


run(psycopg.IsolationLevel.READ_COMMITTED)
run(psycopg.IsolationLevel.SERIALIZABLE)
