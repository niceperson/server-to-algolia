#!/bin/sh

set -e

# doProduction() {
#     echo "hey"
# }

# doDevelopment() {
#     echo "hey"
# }

# showHelp() {
# cat << EOF

# ================================================================

# Usage: ./start.sh -m <production|development>

# # start docker in Development or Production mode
# -h, -help,       --help       Display help
# -v, -mode,       --mode       Start docker with specified mode
# -r, -build,      --build      Rebuild docker image

# ----------------------------------------------------------------
# EOF
# }

# showHelp

aws s3 cp s3://hermo-env/sachi/production.env .env
aws s3 cp s3://hermo-env/sachi/googleapikey.json googleapikey.json
/usr/local/bin/docker-compose -f docker-compose-production.yml up -d --build --scale search=5
#docker-compose -f docker-compose-production.yml up -d --build --scale search=3