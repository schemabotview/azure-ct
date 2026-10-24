"""Read the app's settings from templates/modules/app.bicep, compiled, and
say for each whether it is plain configuration, a Key Vault reference, or a
secret written into the template, which must never happen."""
import json
import re
import subprocess

arm = json.loads(subprocess.run(
    ['bicep', 'build', 'templates/modules/app.bicep', '--stdout'],
    capture_output=True, text=True, check=True).stdout)
app = next(r for r in arm['resources'] if r['type'] == 'Microsoft.Web/sites')
for setting in app['properties']['siteConfig']['appSettings']:
    value = setting['value']
    if '@Microsoft.KeyVault(' in value:
        secret = re.search(r'SecretName=([\w-]+)', value)[1]
        kind = f'Key Vault reference: {secret}, read at startup'
    elif re.search(r'(?i)(password|key|secret)=', value):
        kind = 'A SECRET IN THE TEMPLATE'
    else:
        kind = 'configuration'
    print(f"{setting['name']:20}{kind}")
identity = arm['parameters']['identityName']['defaultValue']
print(f'references are read as the app identity {identity}')
