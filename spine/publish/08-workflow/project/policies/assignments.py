"""Who holds which role, at which scope: the platform's role assignments."""
MG = '/providers/Microsoft.Management/managementGroups/landing-zones'
PROD = '/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e'
DEV = '/subscriptions/bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f'
DATA = PROD + '/resourceGroups/rg-risk-prod-data'
LAKE = DATA + '/providers/Microsoft.Storage/storageAccounts/stwgriskprod'
CONTAINER = LAKE + '/blobServices/default/containers/'
GOLD_FILE = CONTAINER + 'gold/exposure/2026-10-13.parquet'

PARENT = {PROD: MG, DEV: MG}  # a subscription's management group
MEMBERS = {'priya': 'Risk Data Engineers', 'omar': 'Risk Analysts',
           'audit-01': 'Risk Auditors'}

ASSIGNMENTS = [  # who, role, scope
    ('Risk Data Engineers', 'Contributor', DEV),
    ('Risk Data Engineers', 'Reader', PROD),
    ('Risk Analysts', 'Storage Blob Data Reader', CONTAINER + 'gold'),
    ('Risk Auditors', 'Reader', MG),
    ('Risk Auditors', 'Storage Blob Data Reader', CONTAINER + 'reports'),
    ('adf-wg-risk-prod', 'Storage Blob Data Contributor',
     CONTAINER + 'landing'),
]
