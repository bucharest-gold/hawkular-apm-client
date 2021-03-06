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
const apm = require('../index');
const roi = require('roi');

const sleep = (ms) => {
  let currentTime = new Date().getTime();
  while (currentTime + ms >= new Date().getTime()) { }
};

test('Should access the fake app to catch traces.', t => {
  const options = {
    'endpoint': 'http://localhost:3000/hello'
  };

  roi.get(options)
    .then(x => {
      t.equals(x.statusCode, 200);
      t.end();
    }).catch(e => console.log(e));
});

test('Should access hawkular server to check if traces was added.', t => {
  sleep(3000);

  const options = {
    'endpoint': 'http://localhost:8080/hawkular/apm/traces/fragments/search',
    'username': 'jdoe',
    'password': 'password'
  };

  apm.search(options, 1)
    .then(x => {
      t.equal(JSON.parse(x.body).length > 0, true);
      t.end();
    }).catch(e => console.log(e));
});
