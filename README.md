# ijs.ext.charting

IJavaScript extension for creating charts using the Google Charting API.

## Example Usage

Step 1 - Loading the charting extension into an ijs notebook

    %extension charting

Step 2 - Defining some data

    %%json --name someData
    [
      { "x": 1, "y": 100 },
      { "x": 2, "y": 50 },
      { "x": 3, "y": 200 },
      { "x": 4, "y": 75 },
      { "x": 5, "y": 57 },
      { "x": 6, "y": 120 }
    ]

Step 3 - Charting

    %%chart scatter --data someData
    {
      "width": "100%"
    }

The general syntax for creating a chart is

    %%chart chart_type --data name_of_data_variable
    Optional chart options JSON


