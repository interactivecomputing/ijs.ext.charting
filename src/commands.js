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
// commands.js
// The commands implemented by the charting extension.
//

// Implements the %%chart command, that can be used to render a chart.
function chartCommand(shell, args, data, evaluationId) {
  data = data || '';
  data = data.trim();

  var chartData = shell.state[args.data];
  if (!chartData) {
    throw shell.createError('A valid data variable was not specified.');
  }

  return shell.state._.data.html('')
              .addScript('elem.innerHTML = gchart.toString();')
              .addDependency('gchart', 'gchart');
}
chartCommand.options = function(parser) {
  return parser
    .help('Renders the specified chart to visualize the specified data.')
    .option('type', {
      full: 'type',
      metavar: 'type',
      type: 'string',
      choices: [ 'table', 'line', 'columns', 'bars', 'pie', 'scatter' ],
      default: 'table',
      required: true,
      help: 'the type of chart to render'
    })
    .option('data', {
      full: 'data',
      metavar: 'variable',
      type: 'string',
      required: true,
      help: 'the data to render'
    });
}


module.exports = {
  chart: chartCommand
};
