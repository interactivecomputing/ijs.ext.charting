// Copyright 2015 Interactive Computing project (https://github.com/interactivecomputing).
// All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
// except in compliance with the License. You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the
// License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific language governing permissions
// and limitations under the License.
//
// index.js
// The ijs extension implementation.
//

var util = require('util');
var commands = require('./commands');

var CHART_SCRIPT_URL =
  'https://rawgit.com/interactivecomputing/ijs.ext.charting/master/dist/gchart';

function initialize(shell, callback) {
  shell.registerCommand('chart', commands.chart);

  // The result of loading the extension is a small bit of client-side script.

  // In particular this script adds requirejs config to be able to load
  // the script associated with this extension. This script is loaded directly
  // from the github repository.

  var script = util.format('require.config({ paths: { "gchart": "%s" } });',
                           CHART_SCRIPT_URL);

  process.nextTick(function() {
    callback(null, shell.state._.data.script(script));
  });
}

module.exports = {
  initialize: initialize
};
