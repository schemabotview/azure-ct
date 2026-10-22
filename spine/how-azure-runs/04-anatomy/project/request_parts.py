"""The parts of one data-plane request: the read `az storage blob show` makes, through the SDK."""
import os

from azure.storage.blob import BlobClient

seen = {}


def on_response(response):
    # the request as it was sent, signed: the response carries it
    r = response.http_request
    seen.update(method=r.method, url=r.url, version=r.headers['x-ms-version'],
                date=r.headers['x-ms-date'], auth=r.headers['Authorization'],
                status=response.http_response.status_code)


blob = BlobClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'], 'landing', 'hierarchy/hierarchy_20261013.csv')
props = blob.get_blob_properties(raw_response_hook=on_response)

scheme, _, credential = seen['auth'].partition(' ')
account, _, signature = credential.partition(':')
for part, value in [
    ('method', seen['method']),
    ('url', seen['url']),
    ('api version', seen['version']),
    ('date', seen['date']),
    ('scheme', scheme),
    ('account', account),
    ('signature', f'HMAC-SHA256 of the request, {len(signature)} characters (not shown)'),
    ('status', seen['status']),
    ('length', f'{props.size} bytes'),
]:
    print(f'{part:13} {value}')
