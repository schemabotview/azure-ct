"""What API Management does with five requests, as a model that reads the
real policy (policies/apim/exposure-api.xml): the token's audience and scope
are checked first, then the subscription's calls per minute."""
import xml.etree.ElementTree as ET

policy = ET.parse('policies/apim/exposure-api.xml').getroot()
jwt = policy.find('inbound/validate-jwt')
audience = jwt.find('audiences/audience').text
scope = jwt.find('required-claims/claim/value').text
limit = int(policy.find('inbound/rate-limit-by-key').get('calls'))


def door(token, calls_this_minute):
    if token is None:
        return '401: no token'
    if token['aud'] != audience:
        return f"401: token is for {token['aud']}"
    if scope not in token['scp'].split():
        return f'401: no {scope} scope'
    if calls_this_minute >= limit:
        return f'429: {limit} calls a minute used, retry after the minute'
    return '200: passed to the API'


OMAR = {'aud': audience, 'scp': 'Exposure.Read'}
REQUESTS = [('no Authorization header', None, 0),
            ('a Graph token', {'aud': 'https://graph.microsoft.com',
                               'scp': 'User.Read'}, 0),
            ('this API, no scope', {'aud': audience, 'scp': ''}, 0),
            ("omar's dashboard, call 12", OMAR, 11),
            ("a team's script, call 61", OMAR, 60)]
for who, token, calls in REQUESTS:
    print(f'{who:27}{door(token, calls)}')
