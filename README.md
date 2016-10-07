# hawkular-apm-client

[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/hawkular-apm-client/badge.svg)](https://coveralls.io/github/bucharest-gold/hawkular-apm-client)
[![Build Status](https://travis-ci.org/bucharest-gold/hawkular-apm-client.svg?branch=master)](https://travis-ci.org/bucharest-gold/hawkular-apm-client)

Node.js client for Hawkular APM server.

|                 | Project Info  |
| --------------- | ------------- |
| License:        | Apache-2.0 |
| Build:          | make |
| Documentation:  | N/A |
| Issue tracker:  | https://github.com/bucharest-gold/hawkular-apm-client/issues |
| Engines:        | Node.js 4.x, 5.x, 6.x |

## Installation

    N/A

## Usage

    const client = require('hawkular-apm-client');

    client.enable();

    const options = {
      'endpoint': 'http://localhost:8080/hawkular/apm/traces/fragments',
      'username': 'jdoe',
      'password': 'password',
      'type': 'Producer',
      'uri': '/hello'
    };

    // This will send the traces to Hawkular APM server.
    apm.send(options)
    .then(x => console.log('Traces added to hawkular-apm-server.'))
    .catch(e => console.log(e));

    const options = {
      'endpoint': 'http://localhost:8080/hawkular/apm/traces/fragments/search',
      'username': 'jdoe',
      'password': 'password'
    };

    // You can search some traces based on startTime.
    let startTime = 1;
    apm.search(options, startTime)
    .then(x => {
      console.log(x.body);
    }).catch(e => console.log(e));


## Contributing

Please read the [contributing guide](./CONTRIBUTING.md)