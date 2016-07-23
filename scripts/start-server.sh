#!/bin/bash

. scripts/version.sh

function waitForServer {
  C=50
  while [ $C -gt 0 ]
  do
    grep "Admin console listening on http://127.0.0.1:10090" apm.log
    if [ $? -eq 0 ]; then
      echo "Server started."
      C=0
    else
      echo -n "."
      C=$(( $C - 1 ))
    fi
    sleep 1
  done
}

if [ ! -e ${HAWKULAR_APM} ]
then
  # wget https://github.com/hawkular/hawkular-apm/releases/download/${VERSION}/${HAWKULAR_APM}.zip
  unzip -d ${HAWKULAR_APM} ${HAWKULAR_APM}.zip
fi

./${HAWKULAR_APM}/bin/standalone.sh -Djboss.socket.binding.port-offset=100 -Djava.net.preferIPv4Stack=true > apm.log 2>&1 &

waitForServer