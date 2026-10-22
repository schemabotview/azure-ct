"""Which GitHub job may sign in as which identity: a model of the match.

GitHub gives each job a short-lived token. Entra ID accepts it only if its
issuer, audience and subject equal a federated credential's exactly.
"""
ISSUER = 'https://token.actions.githubusercontent.com'
AUDIENCE = 'api://AzureADTokenExchange'
REPO = 'repo:woodgrove-example/risk-on-azure'
CREDENTIALS = {  # identity: the subject its federated credential names
    'risk-deploy-dev': f'{REPO}:environment:dev',
    'risk-deploy-prod': f'{REPO}:environment:prod',
}
JOBS = {  # a job: the subject GitHub puts in its token
    'release, env dev': f'{REPO}:environment:dev',
    'release, env prod': f'{REPO}:environment:prod',
    'a pull request': f'{REPO}:pull_request',
    'a fork': 'repo:someone/risk-on-azure:environment:prod',
}

for job, subject in JOBS.items():
    token = {'iss': ISSUER, 'aud': AUDIENCE, 'sub': subject}
    match = [identity for identity, sub in CREDENTIALS.items()
             if token == {'iss': ISSUER, 'aud': AUDIENCE, 'sub': sub}]
    print(f'{job:19}{match[0] if match else "refused: no credential"}')
    print(f'  sub {subject}')
