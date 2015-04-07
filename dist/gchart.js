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
// gchart.js
// Enables rendering charts using Google's charting library.
//

define(function() {
  'use strict';

  // Chart rendering functionality

  var chartMap = {
    area: { name: 'AreaChart' },
    columns: { name: 'ColumnChart' },
    bars: { name: 'BarChart' },
    histogram: { name: 'Histogram' },
    line: { name: 'LineChart' },
    pie: { name: 'PieChart' },
    scatter: { name: 'ScatterChart' },
    table: { name: 'Table', script: 'table', options: tableOptions }
  };

  function renderChart(element, model, data) {
    var chartInfo = chartMap[model.type];
    var chartScript = chartInfo.script || 'corechart';

    require(['gchart!' + chartScript], function(visualization) {
      var chartOptions = model.options || {};
      if (chartInfo.options) {
        chartInfo.options(chartOptions);
      }

      var chartType = visualization[chartInfo.name];
      var chart = new chartType(element);
      var dataTable = new visualization.DataTable(data);

      chart.draw(dataTable, chartOptions);
    });
  }

  function tableOptions(options) {
    options.cssClassNames = {
      tableRow: 'gchart-table-row',
      headerRow: 'gchart-table-headerrow',
      oddTableRow: 'gchart-table-oddrow',
      selectedTableRow: 'gchart-table-selectedrow',
      hoverTableRow: 'gchart-table-hoverrow',
      tableCell: 'gchart-table-cell',
      headerCell: 'gchart-table-headercell',
      rowNumberCell: 'gchart-table-rownumcell'
    };
  }

  // Chart script loading functionality

  // Chart packages that have been enqueued to be loaded, until the Google API loader itself
  // has been loaded.
  var queue = {
    packages: [],
    callbacks: []
  };

  function invokeVisualizationCallback(cb) {
    cb(google.visualization);
  }

  function loadVisualizationPackages(names, callbacks) {
    if (names.length) {
      var loadOptions = {
        packages: names,
        callback: function() { callbacks.forEach(invokeVisualizationCallback); }
      };

      google.load('visualization', /* version */ '1', loadOptions);
    }
  }

  function loadChart(name, req, callback, config) {
    if (config.isBuild) {
      loadCallback(null);
    }
    else {
      if (queue) {
        // Queue the package and associated callback to load, once the loader has been loaded.
        queue.packages.push(name);
        queue.callbacks.push(callback);
      }
      else {
        // Loader has already been loaded, so go ahead and load the specified package.
        loadVisualizationPackages([ name ], [ callback ]);
      }
    }
  }


  // Supporting code to load the Google API Loader

  var callbackName = '__googleApiLoaderCallback';
  function loadGoogleApiLoader(callback) {
    var head = document.getElementsByTagName('head')[0];

    // Visualization packages are loaded using the Google API loader.
    // The loader URL itself must contain a callback (by name) that it invokes when its loaded.
    window[callbackName] = callback;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//www.google.com/jsapi?callback=' + callbackName;
    head.appendChild(script);

    // Also load the custom css
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = require.s.contexts._.config.paths.gchart + '.css';
    head.appendChild(link);
  }

  loadGoogleApiLoader(function() {
    delete window[callbackName];
    if (queue) {
      loadVisualizationPackages(queue.packages, queue.callbacks);

      // With the Google API loader loaded, null out the queue, so subsequent packages
      // are directly loaded.
      queue = null;
    }
  });


  // The module object
  return {
    load: loadChart,
    render: renderChart
  }
});
