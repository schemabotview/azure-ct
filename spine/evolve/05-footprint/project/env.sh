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

# The Cosmos DB emulator, with the key Microsoft publishes for it. Against
# Azure: the account's endpoint and an Entra ID sign-in, no key.
export COSMOS_ENDPOINT=http://localhost:8081
export COSMOS_KEY="C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqob\
D4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="

# The Azure Data Explorer emulator (Kustainer): the same query language,
# KQL, that Log Analytics answers. No key; it holds no real logs.
export KUSTO_URL=http://localhost:8080
