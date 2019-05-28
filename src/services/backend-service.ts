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
 - https://github.com/axios/axios

 **/

import axios from "axios";
import config from "../../config";

export default class BackendService {
  /**
   *
   * @param query
   * @param page
   * @param pageSize
   */
  static async runQuery(query: string, page: number, pageSize: number) {
    return await axios.post(config.api + "/query", {
      sql: query,
      pageSize: pageSize,
      page: page
    });
  }

  /**
   * Get the schema
   */
  static async getSchema() {
    return await axios.get(config.api + "/schema");
  }
}
