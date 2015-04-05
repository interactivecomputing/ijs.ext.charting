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
// dataTable.js
// Converts data into the most efficient structure that can be used to load data tables on
// the client.
//

function createDataTable(data) {
  if (!data || !data.length) {
    return { cols: [], rows: [] };
  }

  var columns = [];
  var rows = [];

  var firstItem = data[0];
  for (var n in firstItem) {
    columns.push({ id: n, label: n, type: typeof firstItem[n] });
  }

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var cells = [];

    for (var j = 0; j < columns.length; j++) {
      cells.push({ v: item[columns[j].id] });
    }

    rows.push({ c: cells });
  }

  return { cols: columns, rows: rows };
}

module.exports = {
  create: createDataTable
};
