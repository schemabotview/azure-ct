"""Control plane against data plane: what Contributor on the lake does not give.

An incident fix gave priya Contributor on the prod data resource group.
"""
from access_check import check
from assignments import ASSIGNMENTS, DATA, GOLD_FILE, LAKE

ASSIGNMENTS.append(('priya', 'Contributor', DATA))
ACCOUNT = 'Microsoft.Storage/storageAccounts/'
BLOB_READ = ACCOUNT + 'blobServices/containers/blobs/read'

for who, what, action, scope, data in [
    ('priya', 'change the lake’s settings', ACCOUNT + 'write', LAKE, False),
    ('priya', 'read a gold file, Entra token', BLOB_READ, GOLD_FILE, True),
    ('priya', 'list the account keys', ACCOUNT + 'listkeys/action', LAKE,
     False),
    ('omar', 'read a gold file, Entra token', BLOB_READ, GOLD_FILE, True),
    ('omar', 'change the lake’s settings', ACCOUNT + 'write', LAKE, False),
]:
    print(f'{who:7}{what:33}{check(who, action, scope, data)}')
print('a key reads every file in the account, whoever holds it:')
print('  allowSharedKeyAccess=false on the lake (Course 7) refuses keys')
