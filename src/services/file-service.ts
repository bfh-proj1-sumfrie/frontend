/**

 Author: Elias Summermatter & Jan Friedli
 Date: 28.05.2019

 Licence:
 This file is part of BloSQL.

 BloSQL is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 BloSQL is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.

 External Content:
 Code partly adapted from:
 - https://www.npmjs.com/package/export-to-csv

 **/

import { ExportToCsv } from "export-to-csv";

export default class FileService {
  /**
   *
   * @param query
   */
  static async generateCSV(data: object) {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }
}
