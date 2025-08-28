#!/bin/bash
set -e

echo "[INFO] Setting up certificates..."

mkdir -p /app/certs

# ---- Base64 encoded certificates ----
# CA Certificate
cat <<EOF | base64 -d > /app/certs/ca.crt
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUR5VENDQW1XZ0F3SUJBZ0lVQUtY...
LS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
EOF

# Server Certificate
cat <<EOF | base64 -d > /app/certs/server.crt
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUQ1VENDQW9XZ0F3SUJBZ0lVQ...
LS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
EOF

# Server Key
cat <<EOF | base64 -d > /app/certs/server.key
LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFZ1R...
LS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0K
EOF

chmod 600 /app/certs/server.key /app/certs/server.crt /app/certs/ca.crt

echo "[INFO] Starting Node.js server..."
node server.js
