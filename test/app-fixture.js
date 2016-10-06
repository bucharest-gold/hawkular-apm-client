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
      'password': 'password'
    };
    apm.publishTraces(options).then(x => console.log('Traces added to hawkular-apm-server.')).catch(e => console.log(e));
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
