"""A drop token pasted into a vendor ticket: can it be withdrawn?

Two service tokens, signed with the emulator's key: one bound to the
stored access policy collateral-drop, one carrying its own rights and
expiry. The lake's keys are off on Azure, so its tokens are user-delegation
SAS: no stored policy can hold one, and like the second token here, it
lives until it expires or its delegation key is revoked (13-revoke-sas.sh).
"""
import os
from datetime import datetime, timedelta, timezone

from azure.core.exceptions import HttpResponseError
from azure.storage.blob import (AccessPolicy, BlobServiceClient,
                                ContainerClient, ContainerSasPermissions,
                                generate_container_sas)

service = BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'])
landing = service.get_container_client('landing')
key = service.credential.account_key
until = datetime.now(timezone.utc) + timedelta(minutes=30)
write = ContainerSasPermissions(create=True, write=True)

landing.set_container_access_policy(
    {'collateral-drop': AccessPolicy(permission=write, expiry=until)})
tokens = {
    'policy-bound': generate_container_sas(
        service.account_name, 'landing', account_key=key,
        policy_id='collateral-drop'),
    'ad hoc': generate_container_sas(
        service.account_name, 'landing', account_key=key,
        permission=write, expiry=until),
}


def try_all(when, phase):
    print(when)
    for n, (kind, token) in enumerate(tokens.items(), 1):
        drop = ContainerClient(landing.url, 'landing', credential=token)
        try:
            drop.upload_blob(f'collateral/2026-10-16/{phase}{n}.csv', b'x')
            print(f'  {kind:14}write allowed')
        except HttpResponseError as e:
            print(f'  {kind:14}{e.status_code} '
                  f'{getattr(e.error_code, "value", e.error_code)}')


try_all('before: both tokens write', 'a')
landing.set_container_access_policy({})        # delete collateral-drop
try_all('after deleting the policy collateral-drop', 'b')
