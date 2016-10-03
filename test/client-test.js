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

const fs = require('fs');
const path = require('path');
const test = require('tape');
const client = require('../index');

let username = '';
let password = '';

function getUsernameAndPassword () {
  const lines = fs.readFileSync(path.join(__dirname, '../auth.txt')).toString().split('\n');
  username = lines[0].split(':')[1].trim();
  password = lines[1].split(':')[1].trim();
}

getUsernameAndPassword();

// const sleep = (ms) => {
//   let currentTime = new Date().getTime();
//   while (currentTime + ms >= new Date().getTime()) { }
// };

test('Should add traces.', t => {
  let traces = [{
    'id': 'd07c2b20-a77c-45a3-ae27-278a65a7233e',
    'startTime': new Date().getTime(),
    'businessTransaction': 'testhttp',
    'hostAddress': '127.0.0.1',
    'nodes': [{
      'type': 'Producer',
      'uri': '/sayHello',
      'operation': 'GET',
      'baseTime': 28254188696110,
      'duration': 9074249,
      'endpointType': 'HTTP'}]}];

  const options = {
    'endpoint': 'http://localhost:8080/hawkular/apm/fragments',
    'username': username,
    'password': password
  };

  client.publishTraces(options, traces)
    .then(x => {
      console.log(x);
      t.equals(x.statusCode, 200);
      t.end();
    }).catch(e => console.log(e));
});

// test('Should get fragments.', t => {
//   sleep(3000);

//   const options = {
//     'endpoint': 'http://localhost:8080/hawkular/apm/fragments',
//     'username': 'jdoe',
//     'password': 'password'
//   };

//   client.search(options, 1)
//     .then(x => {
//       t.equal(JSON.parse(x.body).length, 1);
//       t.end();
//     }).catch(e => console.log(e));
// });
