'use strict';

// ===========================================================
// This need to be moved to hawkular-apm-client.
const ip = require('ip');
// This need to be moved to hawkular-apm-client.
const lightbright = require('lightbright');
// This need to be moved to hawkular-apm-client.
const Timing = lightbright.builtins.timing;
// This need to be moved to hawkular-apm-client.
lightbright.addFilter(Timing.timer);
// This need to be moved to hawkular-apm-client.
lightbright.enable();
// We need to use something like this:
// const hawkular-apm-client = require('hawkular-apm-client');
// ===========================================================

const fs = require('fs');
const Hapi = require('hapi');
const server = new Hapi.Server();

// This need to be moved to hawkular-apm-client.
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
    // This need to be moved to hawkular-apm-client.
    let t = Timing.timings();
    // This need to be moved to hawkular-apm-client.
    console.log(customTraces(t));
    // lightbright.disable();

    // We need to use something like this:
    // hawkular-apm-client().publishTraces();
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
