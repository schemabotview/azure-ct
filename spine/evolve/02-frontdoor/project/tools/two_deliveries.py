"""The collateral file is delivered twice: the transfer retried after a
timeout, and the second copy differs (COL-7004 revalued from 6.00 to 5.40).
Data Factory started reading the first copy in between."""
import os

from azure.core import MatchConditions
from azure.core.exceptions import HttpResponseError
from azure.storage.blob import BlobServiceClient

lake = BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'])
landing = lake.get_container_client('landing')
first = open('data/collateral_20261013.csv', 'rb').read()
second = first.replace(b'vessel mortgage,6.00', b'vessel mortgage,5.40')


def code(error):  # the service's own error code, as a plain string
    return getattr(error.error_code, 'value', error.error_code)


def step(what, action):
    try:
        action()
        print(f'{what:42}ok')
    except HttpResponseError as e:
        print(f'{what:42}{e.status_code} {code(e)}')


print('1. plain writes: the last one wins')
blob = landing.get_blob_client('collateral/plain.csv')
step('  first copy', lambda: blob.upload_blob(first))
etag = blob.get_blob_properties().etag  # the reader starts here
step('  second copy, overwrite', lambda: blob.upload_blob(
    second, overwrite=True))
step('  reader reads on, if unchanged', lambda: blob.download_blob(
    etag=etag, match_condition=MatchConditions.IfNotModified).readall())

print('2. write once: only if the name is new')
blob = landing.get_blob_client('collateral/once.csv')
step('  first copy', lambda: blob.upload_blob(first))
step('  second copy', lambda: blob.upload_blob(second))

print('3. a lease: one writer at a time')
lease = blob.acquire_lease(lease_duration=60)  # the reader holds it
step('  a writer without the lease', lambda: blob.upload_blob(
    second, overwrite=True))
step('  the reader marks it loaded', lambda: blob.set_blob_metadata(
    {'loaded': 'true'}, lease=lease))
