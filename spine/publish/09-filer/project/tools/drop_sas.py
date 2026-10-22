"""The collateral system's drop: a SAS that can only write into landing.

On Azure the token is a user-delegation SAS, signed with a key the platform
asks Entra ID for, because the lake's account keys are switched off. The
emulator has no Entra ID, so here it is signed with the emulator's key.
"""
import os
from datetime import datetime, timedelta, timezone

from azure.core.exceptions import HttpResponseError
from azure.storage.blob import (BlobServiceClient, ContainerClient,
                                ContainerSasPermissions, generate_container_sas)

service = BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'])
landing = service.get_container_client('landing')
now = datetime.now(timezone.utc)


def code(error):  # the service's own error code, as a plain string
    return getattr(error.error_code, 'value', error.error_code)


def drop_token(expires):
    return generate_container_sas(
        service.account_name, 'landing',
        account_key=service.credential.account_key,
        permission=ContainerSasPermissions(create=True, write=True),
        expiry=expires)


def attempt(what, token, action):
    drop = ContainerClient(landing.url, 'landing', credential=token)
    try:
        action(drop)
        print(f'{what:38}allowed')
    except HttpResponseError as e:
        print(f'{what:38}{e.status_code} {code(e)}')


name = 'collateral/2026-10-13/collateral_20261013.csv'
data = open('data/collateral_20261013.csv', 'rb').read()
token = drop_token(now + timedelta(minutes=30))
attempt('write the file, until 19:30', token,
        lambda c: c.upload_blob(name, data))
attempt('read it back', token, lambda c: c.download_blob(name).readall())
attempt('list landing', token, lambda c: list(c.list_blobs()))
attempt('write with yesterday\'s token', drop_token(now - timedelta(days=1)),
        lambda c: c.upload_blob(name + '.2', data))
