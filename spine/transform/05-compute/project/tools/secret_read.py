"""Who in the workspace can read the TradeBook password, a model. Entra ID
groups are synced into Databricks (automatic identity management); a group
added to the workspace gets in; the scope's ACL decides who reads a secret.
"""
GROUPS = {  # Entra group: (in the workspace?, members)
    'Risk Data Engineers': (True, ['priya']),
    'Risk Analysts': (True, ['omar']),
    'Credit Officers': (False, ['sam']),
}
SCOPE_ACL = {'risk-kv': {'Risk Data Engineers': 'READ'}}

print("dbutils.secrets.get('risk-kv', 'tradebook-dbx-reader')")
for group, (in_workspace, people) in GROUPS.items():
    for person in people:
        if not in_workspace:
            answer = 'cannot sign in to the workspace'
        elif SCOPE_ACL['risk-kv'].get(group) in ('READ', 'WRITE', 'MANAGE'):
            answer = 'reads it; a notebook prints [REDACTED]'
        else:
            answer = 'refused: no READ on risk-kv'
        print(f'  {person:6}({group}): {answer}')
