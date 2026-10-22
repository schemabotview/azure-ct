# risk-on-azure, development. Run `source env.sh` before anything else.
export AZURE_DEFAULTS_LOCATION=uksouth        # az's default Region
export AZURE_DEFAULTS_GROUP=rg-risk-dev-data  # az's default group
export AZURE_STORAGE_ACCOUNT=stwgriskdev      # the development lake

# The storage emulator (Azurite), with its own key, which exists only in
# the emulator. Against Azure, delete this export, run az login, and add
# --auth-mode login to az storage commands.
AZURITE=http://127.0.0.1
export AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=http;\
AccountName=stwgriskdev;\
AccountKey=d29vZGdyb3ZlLWVtdWxhdG9yLWtleS1ub3QtYS1zZWNyZXQ=;\
BlobEndpoint=$AZURITE:10000/stwgriskdev;\
QueueEndpoint=$AZURITE:10001/stwgriskdev;\
TableEndpoint=$AZURITE:10002/stwgriskdev;"

# The messaging emulators (Event Hubs, then Service Bus), with their fixed
# development key. Against Azure: no key at all, an Entra ID sign-in and
# the namespace's name (evh-wg-risk-dev.servicebus.windows.net).
EMULATOR="Endpoint=sb://localhost;\
SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;\
UseDevelopmentEmulator=true;"
export EVENTHUBS_CONNECTION_STRING=$EMULATOR
export SERVICEBUS_CONNECTION_STRING=$EMULATOR
