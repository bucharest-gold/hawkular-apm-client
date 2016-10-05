'use strict';

// ===========================================================
// // This need to be moved to hawkular-apm-client.
// const ip = require('ip');
// // This need to be moved to hawkular-apm-client.
// const lightbright = require('lightbright');
// // This need to be moved to hawkular-apm-client.
// const Timing = lightbright.builtins.timing;
// // This need to be moved to hawkular-apm-client.
// lightbright.addFilter(Timing.timer);
// // This need to be moved to hawkular-apm-client.
// lightbright.enable();
// // We need to use something like this:
const apm = require('../index');
apm.enable();
// ===========================================================

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
    // =========================================================
    // // This need to be moved to hawkular-apm-client.
    // let t = Timing.timings();
    // // This need to be moved to hawkular-apm-client.
    // console.log(customTraces(t));
    // // lightbright.disable();

    const options = {
      'endpoint': 'http://localhost:8080/hawkular/apm/traces/fragments',
      'username': 'jdoe',
      'password': 'password'
    };
    apm.publishTraces(options).then(x => console.log(x)).catch(e => console.log(e));
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
