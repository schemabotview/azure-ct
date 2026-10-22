# Course 2's demo: one storage account, stwgriskprod, served by the emulator.
export AZURE_STORAGE_ACCOUNT=stwgriskprod

# The emulator (Azurite) and its own key, which exists only in the emulator. Against Azure,
# delete this export, run az login, and add --auth-mode login to each az storage command.
export AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=http;AccountName=stwgriskprod;\
AccountKey=d29vZGdyb3ZlLWVtdWxhdG9yLWtleS1ub3QtYS1zZWNyZXQ=;\
BlobEndpoint=http://127.0.0.1:10000/stwgriskprod;\
QueueEndpoint=http://127.0.0.1:10001/stwgriskprod;\
TableEndpoint=http://127.0.0.1:10002/stwgriskprod;"
