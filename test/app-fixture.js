'use strict';

// =========================================================
const ip = require('ip');
const lightbright = require('lightbright');
const Timing = lightbright.builtins.timing;
lightbright.addFilter(Timing.timer);
lightbright.enable();
// =========================================================

const fs = require('fs');
const Hapi = require('hapi');
const server = new Hapi.Server();

function customTraces (t) {
  let traces = [];
  const hostAddress = ip.address();
  t.forEach(e => {
    traces.push({
      'id': e.id,
      'startTime': new Date().getTime(),
      'businessTransaction': e.location,
      'hostAddress': hostAddress,
      'nodes': [{
        'type': 'Producer',
        'uri': '/hello',
        'operation': 'GET',
        'baseTime': 28254188696110,
        'duration': e.elapsed,
        'endpointType': 'HTTP'
      }]
    });
  });

  return traces;
}

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    // =========================================================
    let t = Timing.timings();
    console.log(customTraces(t));
    // lightbright.disable();
    // =========================================================
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
