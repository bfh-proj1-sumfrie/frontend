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
 - https://vuejs.org/v2/cookbook/client-side-storage.html

 **/

export interface CustomQueryIface {
  title: string;
  query: string;
}

export class CustomQueryService {
  private static STORAGE_KEY = "userSavedQueries";
  public static saveQuery(
    query: string,
    userQueryKey: string
  ): CustomQueryIface[] {
    if (userQueryKey === "") userQueryKey = "unnamed query";
    let userQueries = CustomQueryService.getQueriesFromLocalStorage();
    userQueries.push({
      title: userQueryKey,
      query: query
    });
    CustomQueryService.saveQueriesToLocalStorage(userQueries);
    return CustomQueryService.getQueriesFromLocalStorage();
  }
  public static deleteQuery(index: number): CustomQueryIface[] {
    let queries = CustomQueryService.getQueriesFromLocalStorage();
    queries.splice(index, 1);
    CustomQueryService.saveQueriesToLocalStorage(queries);
    return CustomQueryService.getQueriesFromLocalStorage();
  }
  public static getQueriesFromLocalStorage(): CustomQueryIface[] {

    // only load if key in local storage exists
    if (localStorage.getItem(CustomQueryService.STORAGE_KEY)) {
      return JSON.parse(
          String(localStorage.getItem(CustomQueryService.STORAGE_KEY))
      );
    }
    return []
  }

  private static saveQueriesToLocalStorage(queries: object[]) {
    localStorage.setItem(
      CustomQueryService.STORAGE_KEY,
      JSON.stringify(queries)
    );
  }
}
