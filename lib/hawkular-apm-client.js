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

const util = require('./util');
const requestHandler = require('./request-handler');

module.exports = client;

function client (options) {
  const handleOptions = (uri) => {
    options = util.handleOptions(options);
    options.uri = uri;
    return options;
  };

  const get = () => requestHandler.get(options);

  const post = () => requestHandler.post(options);

  function search (startTime) {
    handleOptions('/fragments?startTime=' + startTime);
    return get();
  }

  function add (traces) {
    handleOptions('/fragments');
    options.body = traces;
    return post();
  }

  return Object.freeze({
    add,
    search
  });
}
