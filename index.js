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

/**
 * @module hawkular-apm-client
 */
module.exports = exports = {
  enable: enable,
  disable: disable,
  publishTraces: publishTraces,
  search: search
};

// We need this to get the machine IP address.
const ip = require('ip');
// We need this to send data to hawkular-apm-server.
const roi = require('roi');
// We need this to get the node traces.
const lightbright = require('lightbright');
const Timing = lightbright.builtins.timing;

function enable () {
  lightbright.addFilter(Timing.timer);
  lightbright.enable();
}

function disable () {
  lightbright.disable();
}

function getOperation (type, location) {
  let operation = '';
  if (type === 'Component') {
    operation = location;
  } else {
    // GET/POST/etc ?
    operation = 'GET';
  }
  return operation;
}

function apmTraces (options, lightbrightTraces) {
  let traces = [];
  const hostAddress = ip.address();

  let type = options.type || 'Component';
  let uri = options.uri || '';

  lightbrightTraces.forEach(t => {
    traces.push({
      'id': t.id,
      'startTime': new Date().getTime(),
      'hostAddress': hostAddress,
      'nodes': [{
        'type': type,
        'uri': uri,
        'operation': getOperation(type, t.location),
        'baseTime': process.hrtime()[1], // nanoseconds
        'duration': t.elapsed,
        'endpointType': 'HTTP'
      }]
    });
  });
  return traces;
}

function publishTraces (options) {
  let traces = apmTraces(options, Timing.timings());
  return roi.post(options, traces);
}

function search (options, startTime) {
  options.endpoint.concat('?startTime=' + startTime);
  return roi.get(options);
}
