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
    return JSON.parse(
      String(localStorage.getItem(CustomQueryService.STORAGE_KEY))
    );
  }
  private static saveQueriesToLocalStorage(queries: object[]) {
    localStorage.setItem(
      CustomQueryService.STORAGE_KEY,
      JSON.stringify(queries)
    );
  }
}
