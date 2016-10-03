#!/bin/bash

. scripts/version.sh

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

# docker pull jboss/hawkular-apm-server
# docker run -p 8080:8080 jboss/hawkular-apm-server > apm.log 2>&1 &
# waitForServer
# rm auth.txt
# grep "Username" apm.log > auth.txt
# grep "Password" apm.log >> auth.txt

if [ ! -e ${HAWKULAR_APM} ]
then
  wget https://github.com/hawkular/hawkular-apm/releases/download/${VERSION}/${HAWKULAR_APM}.zip
  unzip -d ${HAWKULAR_APM} ${HAWKULAR_APM}.zip
fi
./${HAWKULAR_APM}/bin/standalone.sh -Djava.net.preferIPv4Stack=true > apm.log 2>&1 &
waitForServer
