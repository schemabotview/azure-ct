"""Azure RBAC's rules as a model: may this identity do this action, here?

Role definitions are Azure's built-in ones (policies/roles/*.json), word for
word; assignments are the platform's (policies/assignments.py). A role held at
a scope applies to every scope beneath it. Deny assignments and conditions are
not modelled: this answers what the roles grant, nothing more.
"""
import fnmatch
import json
import sys
from pathlib import Path

sys.path.insert(0, 'policies')
from assignments import ASSIGNMENTS, MEMBERS, PARENT  # noqa: E402

ROLES = {}
for f in Path('policies/roles').glob('*.json'):
    role = json.loads(f.read_text())
    ROLES[role['roleName']] = role['permissions']


def covers(held: str, target: str) -> bool:
    """A scope covers itself, everything under it, and (a management
    group) every subscription placed in it."""
    held, target = held.lower(), target.lower()
    if target == held or target.startswith(held + '/'):
        return True
    sub = '/'.join(target.split('/')[:3])
    return PARENT.get(sub, '').lower() == held


def matches(patterns: list, action: str) -> bool:
    return any(fnmatch.fnmatch(action.lower(), p.lower()) for p in patterns)


def check(who: str, action: str, scope: str, data: bool = False) -> str:
    names = {who, MEMBERS.get(who)}
    yes, no = ('dataActions', 'notDataActions') if data else \
        ('actions', 'notActions')
    excluded = None
    for principal, role, held in ASSIGNMENTS:
        if principal in names and covers(held, scope):
            for p in ROLES[role]:
                if matches(p[yes], action):
                    if not matches(p[no], action):
                        return f'allowed: {role}'
                    excluded = role
    if excluded:
        return f'denied: excluded by {excluded}'
    return 'denied: no role grants it'
