"""The exposure API: headroom by group, and reservations against it. On App
Service it signs in to the mart as its managed identity; run locally it uses
the local PostgreSQL. Entra ID sign-in is checked in front of it (Course 12).
"""
import json
import os
import re
from decimal import Decimal
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import psycopg
from psycopg import errors

DB = os.environ.get('MART_DATABASE', 'riskmart')
HEADROOM = 'SELECT headroom_musd FROM mart.headroom WHERE group_id = %s'


def reserve(group, key, amount):
    """Check and hold in one serializable transaction; retried on 40001."""
    for _ in range(3):
        try:
            with psycopg.connect(dbname=DB) as db:
                db.isolation_level = psycopg.IsolationLevel.SERIALIZABLE
                left = db.execute(HEADROOM, (group,)).fetchone()[0]
                if amount > left:
                    return 409, {'error': 'over the limit',
                                 'headroom_musd': float(left)}
                db.execute('INSERT INTO mart.reservations VALUES '
                           '(%s, %s, %s) ON CONFLICT DO NOTHING',
                           (key, group, amount))
                return 201, {'reservation': key,
                             'headroom_musd': float(left - amount)}
        except errors.SerializationFailure:
            continue
    return 503, {'error': 'busy, try again'}


class Api(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            with psycopg.connect(dbname=DB) as db:
                db.execute('SELECT 1')
            return self.reply(200, {'status': 'ok'})
        if m := re.fullmatch(r'/groups/([\w-]+)/headroom', self.path):
            with psycopg.connect(dbname=DB) as db:
                row = db.execute(HEADROOM, (m[1],)).fetchone()
            return self.reply(*(200, {'group': m[1],
                                      'headroom_musd': float(row[0])})
                              if row else (404, {'error': 'no such group'}))
        self.reply(404, {'error': 'no such route'})

    def do_POST(self):
        m = re.fullmatch(r'/groups/([\w-]+)/reservations', self.path)
        key = self.headers.get('Idempotency-Key')
        if not m or not key:
            return self.reply(400, {'error': 'route and Idempotency-Key'})
        size = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(size), parse_float=Decimal)
        self.reply(*reserve(m[1], key, body['amount_musd']))

    def reply(self, status, body):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def log_message(self, fmt, *args):  # one line per request, to stdout
        print(f'{self.command} {self.path} {args[1]}', flush=True)


if __name__ == '__main__':
    ThreadingHTTPServer(('', int(os.environ.get('PORT', 8000))), Api) \
        .serve_forever()
