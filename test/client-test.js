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

const test = require('tape');
let client = require('../lib/hawkular-apm-client');

let sleep = (ms) => {
  let currentTime = new Date().getTime();
  while (currentTime + ms >= new Date().getTime()) { }
};

test('The client should add traces.', t => {
  let x = 1;
  const traces = [];
  while (x <= 100) {
    traces.push({'id': x++, 'startTime': 1469043380620});
  }

  client({}).add(traces)
    .then(x => {
      t.equals(x, 200);
      t.end();
    }).catch(e => console.log(e));
});

test('The client should get fragments.', t => {
  sleep(1500);
  client({}).search(1)
    .then(x => {
      console.log(x);
      t.equal(x.length, 100);
      t.end();
    }).catch(e => console.log(e));
});
