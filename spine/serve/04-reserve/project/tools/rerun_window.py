"""A run that fails halfway, then runs again: two ways to write a window.
The copy writes its first file, then the runtime loses TradeBook; the retry
writes both. A model in the emulator: the files are real, the failure is
raised on purpose.

  append    each run adds files named by its run id
  replace   each window has one folder and fixed file names
"""
import os

from azure.storage.blob import BlobServiceClient

lake = BlobServiceClient.from_connection_string(
    os.environ['AZURE_STORAGE_CONNECTION_STRING'])
bronze = lake.get_container_client('bronze')
PARTS = {'part-1': b'LC-1995,1.50\n', 'part-2': b'LC-2041,2.00\n'}


def run(mode, run_id, fail_after=None):
    folder = f'{mode}/tradebook/deals/2026-10-13'
    for n, (part, rows) in enumerate(PARTS.items(), 1):
        name = f'{run_id}-{part}' if mode == 'append' else part
        bronze.upload_blob(f'{folder}/{name}.csv', rows, overwrite=True)
        if n == fail_after:
            return 'failed after ' + part
    return 'succeeded'


for mode in ('append', 'replace'):
    first = run(mode, 'run-7f3a', fail_after=1)
    second = run(mode, 'run-9c21')
    blobs = list(bronze.list_blobs(name_starts_with=mode + '/'))
    rows = b''.join(bronze.download_blob(b.name).readall() for b in blobs)
    print(f'{mode:8} first {first}, then {second}')
    count = rows.count(b"LC-")
    print(f'{"":9}{len(blobs)} files, {count} rows (the window has 2)')
