# MMM-InsaTable

**This module is obsolete because the API only gives the response "internal error".**

A module for the [MagicMirror²](https://github.com/MichMich/MagicMirror) project which creates a table filled with a list gathered from a json request.

All the variables of the objects in the array are represented by a table column.
For every column it checks if a valid DateTime is given, and then formats it to `HH:mm:ss` if it is today or `YYYY-MM-DD` otherwise.

This module is based on [MMM-JsonTable](https://github.com/KristjanESPERANTO/MMM-JsonTable).

## Installation

```bash
git clone https://github.com/KristjanESPERANTO/MMM-InsaTable
cd MMM-InsaTable
```

## Config Options

Except `url` all options are optional.

| **Option**     | **Description**                                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url            | The full url to get the json response from <br><br>**Default value:** `""`                                                                                                                                         |
| arrayName      | Define the name of the variable that holds the array to display <br><br>**Default value:** `null`                                                                                                                  |
| noDataText     | Text indicating that there is no data. <br><br>**Default value:** `Json data is not of type array! Maybe the config arrayName is not used and should be, or is configured wrong.`                                  |
| keepColumns    | Columns on json will be showed <br><br>**Default value:** `[]`                                                                                                                                                     |
| tryFormatDate  | For every column it checks if a valid DateTime is given, and then formats it to `HH:mm:ss` if it is today or `YYYY-MM-DD` otherwise <br><br>**Default value:** `false`<br> **Possible values:** `false` and `true` |
| size           | Text size at table, 0 is default and 3 is H3 <br><br>**Default value:** `0`<br> **Possible values:** `0` - `3`                                                                                                     |
| updateInterval | Milliseconds between the refersh <br><br>**Default value:** `15000`                                                                                                                                                |
| animationSpeed | Speed of the update animation. (Milliseconds)<br>If you don't want that the module blinks during an update, set the value to `0`. <br><br>**Default value:** `500`<br> **Possible values:** `0` - `5000`           |
| descriptiveRow | Complete html table row that will be added above the array data <br><br>**Default value:** `""`                                                                                                                    |
| company        | Name of the company <br><br>**Default value:** `""`                                                                                                                                                                |

## Configuration example

```javascript
let date = new Date();

let config = {
  ...
  {
    module: 'MMM-InsaTable',
    position: 'top_right',
    header: 'Verkehrsmeldungen',
    config: {
      url: 'http://reiseauskunft.insa.de/restproxy/himsearch?accessId=nasa.mdv&dateB=' + date.toISOString().substring(0, 10) + '&dateE=' + date.toISOString().substring(0, 10) + '&format=json',
      arrayName: 'Message',
      tryFormatDate: true,
      keepColumns: ['head', 'text', 'affectedProduct'],
      descriptiveRow: '<tr><th>Titel</th><th>Text</th><th>Betroffene Linien</th></tr>',
      company: 'LVB - Leipziger Verkehrsbetriebe'
    }
  },
```
