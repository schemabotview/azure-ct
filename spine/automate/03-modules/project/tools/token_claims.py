"""What an access token says, and what its signature proves.

The token is made HERE, with the claims Microsoft Entra ID puts in a token
for omar calling the exposure API, and a local key standing in for Entra's.
"""
import jwt
from cryptography.hazmat.primitives.asymmetric import rsa

TENANT = 'aaaabbbb-0000-cccc-1111-dddd2222eeee'
key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
claims = {
    'aud': 'api://exposure-api',                # who it is for
    'iss': f'https://login.microsoftonline.com/{TENANT}/v2.0',
    'tid': TENANT,                              # which tenant
    'oid': 'bbbbcccc-1111-dddd-2222-eeee3333ffff',  # which user
    'name': 'omar',
    'scp': 'Exposure.Read',                     # what he consented to
    'azp': '00001111-aaaa-2222-bbbb-3333cccc4444',  # the app that asked
    'iat': 1791964800, 'exp': 1791968700,       # 08:00 to 09:05, 14 Oct
}
token = jwt.encode(claims, key, algorithm='RS256', headers={'kid': 'demo'})
print(f'token: {len(token)} characters, three parts: {token.count(".") + 1}')

seen = jwt.decode(token, key.public_key(), algorithms=['RS256'],
                  audience='api://exposure-api')
for name in ('aud', 'iss', 'tid', 'oid', 'name', 'scp', 'azp'):
    print(f'{name:5}{seen[name]}')
print(f'lasts {(seen["exp"] - seen["iat"]) // 60} minutes; signature verified')

head, body, sig = token.split('.')
forged = head + '.' + jwt.utils.base64url_encode(
    jwt.utils.base64url_decode(body).replace(b'Read', b'Admin')).decode() \
    + '.' + sig
try:
    jwt.decode(forged, key.public_key(), algorithms=['RS256'],
               audience='api://exposure-api')
except jwt.InvalidSignatureError as e:
    print(f'scp changed to Exposure.Admin: {e}')
