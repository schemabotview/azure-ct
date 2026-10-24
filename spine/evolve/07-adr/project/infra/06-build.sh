#!/usr/bin/env bash
# Build once: the template and each environment's parameters, compiled to
# out/, with a checksum of each, so what reaches prod is what dev tested.
set -euo pipefail
mkdir -p out
bicep build templates/main.bicep --outfile out/main.json
for ENV in dev prod; do
  bicep build-params "templates/$ENV.bicepparam" \
    --outfile "out/$ENV.parameters.json"
done
(cd out && sha256sum main.json dev.parameters.json prod.parameters.json \
  > SHA256SUMS)
