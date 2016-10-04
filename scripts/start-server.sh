#!/bin/bash

function waitForServer {
  C=50
  while [ $C -gt 0 ]
  do
    grep "WildFly Full 10.0.0.Final (WildFly Core 2.0.10.Final) started" apm.log
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

docker pull jboss/hawkular-apm-server-dev
docker run -p 8080:8080 jboss/hawkular-apm-server-dev > apm.log 2>&1 &
waitForServer
