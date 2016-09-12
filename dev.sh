#!/bin/bash

./scripts/stop-server.sh 
rm -Rf hawkular-apm-dist-0.10.0.Final
unzip hawkular-apm-dist-0.10.0.Final.zip -d hawkular-apm-dist-0.10.0.Final
./scripts/start-server.sh
# make test
