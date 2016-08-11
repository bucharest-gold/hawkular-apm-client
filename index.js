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

const ip = require('ip');
const roi = require('roi');
const lightbright = require('lightbright');
const Timing = lightbright.builtins.timing;

function enable () {
  lightbright.addFilter(Timing.timer);
  lightbright.enable();
}

function disable () {
  lightbright.disable();
}

function traces (t) {
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
        'uri': '/hail',
        'operation': 'GET',
        'baseTime': 28254188696110,
        'duration': e.elapsed,
        'endpointType': 'HTTP'
      }]
    });
  });

  return traces;
}

function publishTraces (options) {
  let t = Timing.timings();
  console.log(traces(t));
  options.endpoint = options.baseUrl + '/fragments';
  return roi.post(options, traces(t));
}

function search (options, startTime) {
  options.endpoint = options.baseUrl + '/fragments?startTime=' + startTime;
  return roi.get(options);
}
