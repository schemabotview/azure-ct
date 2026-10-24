"""A reservation commits, then the reply is lost: the network drops after
COMMIT and the API sees only an error. Does retrying hold the headroom twice?
Run against the risk mart (PostgreSQL 16, local); the lost reply is staged.
"""
import psycopg

COUNT = "SELECT count(*), coalesce(sum(amount_musd), 0) FROM mart.reservations"


def reserve(conn, key):
    if key:  # the request's own id: a second attempt finds the first
        conn.execute("INSERT INTO mart.reservations VALUES (%s, 'G-WW', 0.50)"
                     " ON CONFLICT (reservation_id) DO NOTHING", (key,))
    else:    # a new id on every attempt
        conn.execute("INSERT INTO mart.reservations VALUES ("
                     "'R-' || gen_random_uuid(), 'G-WW', 0.50)")
    conn.commit()


for key in (None, 'req-7f3a'):
    with psycopg.connect(dbname='riskmart') as conn:
        reserve(conn, key)  # attempt 1 commits ... and its reply is lost
        reserve(conn, key)  # so the API retries
        rows, held = conn.execute(COUNT).fetchone()
        how = f'with key {key}' if key else 'without a key'
        print(f'{how:20} {rows} reservation(s), {held} held for one deal')
        conn.execute('DELETE FROM mart.reservations')
