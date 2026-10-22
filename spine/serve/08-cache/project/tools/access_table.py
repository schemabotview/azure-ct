"""Effective access, read off policies/assignments.py by the RBAC model."""
from access_check import check
from assignments import CONTAINER, DEV, GOLD_FILE as GOLD, LAKE

BLOB = 'Microsoft.Storage/storageAccounts/blobServices/containers/blobs/'
QUESTIONS = [  # who, what, action, scope, is it a data action?
    ('priya', 'create a VM in risk-dev',
     'Microsoft.Compute/virtualMachines/write', DEV + '/resourceGroups/x',
     False),
    ('priya', 'grant a role in risk-dev',
     'Microsoft.Authorization/roleAssignments/write', DEV, False),
    ('priya', 'read prod lake settings',
     'Microsoft.Storage/storageAccounts/read', LAKE, False),
    ('priya', 'change the prod lake',
     'Microsoft.Storage/storageAccounts/write', LAKE, False),
    ('omar', 'read a file in gold', BLOB + 'read', GOLD, True),
    ('omar', 'read a file in landing', BLOB + 'read',
     CONTAINER + 'landing/x.csv', True),
    ('audit-01', 'read prod lake settings',
     'Microsoft.Storage/storageAccounts/read', LAKE, False),
    ('audit-01', 'read a filed report', BLOB + 'read',
     CONTAINER + 'reports/x.csv', True),
    ('adf-wg-risk-prod', 'write a file to landing', BLOB + 'write',
     CONTAINER + 'landing/x.csv', True),
    ('adf-wg-risk-prod', 'write a file to gold', BLOB + 'write', GOLD, True),
]
for who, what, action, scope, data in QUESTIONS:
    print(f'{who:17}{what:26}{check(who, action, scope, data)}')
