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
const client = require('../index');

const sleep = (ms) => {
  let currentTime = new Date().getTime();
  while (currentTime + ms >= new Date().getTime()) { }
};

function getOptions () {
  const options = {
    'baseUrl': 'http://localhost:8180/hawkular/apm',
    'username': 'jdoe',
    'password': 'password'
  };
  return options;
}

test('Should add traces.', t => {
  let traces = [{
    'id': 'd07c2b20-a77c-45a3-ae27-278a65a7233e',
    'startTime': new Date().getTime(),
    'businessTransaction': 'testhttp',
    'hostName': 'localhost.localdomain',
    'hostAddress': '127.0.0.1',
    'nodes': [{
      'type': 'Producer',
      'uri': '/sayHello',
      'operation': 'GET',
      'baseTime': 28254188696110,
      'duration': 9074249,
      'endpointType': 'HTTP'}]}];

  /* let x = 1
  const traces = []
  const nodes = []
  while (x <= 3) {
    sleep(1000)

    let node = {
      'baseTime': 1,
      'correlationIds': [],
      'details': {},
      'duration': 2,
      'fault': 'false',
      'faultDescription': 'nope',
      'issues': [],
      'operation': 'yup',
      'type': 'Component',
      'uri': 'localhost'
    }
    nodes.push(node)
    let trace = {
      'id': x++,
      'startTime': new Date().getTime(),
      'hostAddress': 'localhost',
      'businessTransaction': 'foo',
      'principal': 'bar',
      'nodes': nodes
    }
    traces.push(trace)
  }*/

  client.add(getOptions(), traces)
    .then(x => {
      t.equals(x.statusCode, 200);
      t.end();
    }).catch(e => console.log(e));
});

test('Should get fragments.', t => {
  sleep(3000);
  client.search(getOptions(), 1)
    .then(x => {
      t.equal(JSON.parse(x.body).length, 1);
      t.end();
    }).catch(e => console.log(e));
});
