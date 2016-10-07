/**
 * Copyright 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const apm = require('../index');
apm.enable();

const fs = require('fs');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    const options = {
      'endpoint': 'http://localhost:8080/hawkular/apm/traces/fragments',
      'username': 'jdoe',
      'password': 'password',
      'type': 'Producer',
      'uri': '/hello'
    };
    apm.send(options).then(x => console.log('Traces added to hawkular-apm-server.')).catch(e => console.log(e));
    return reply('Go to: <a href="http://localhost:8080/hawkular-ui/apm">http://localhost:8080/hawkular-ui/apm</a>');
  }
});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log('Go to:', server.info.uri + '/hello');
  console.log(process.pid);
  fs.writeFile('./pid.txt', process.pid, (error) => {
    if (error) return console.error(error);
  });
});
