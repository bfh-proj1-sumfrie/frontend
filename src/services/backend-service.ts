import axios from "axios";

export default class BackendService {
  static BACKEND_URL: string = "https://bfh-proj1-backend.herokuapp.com/query";

  /**
   *
   * @param query
   */
  static async runSql(query: string) {
    return await axios.post(BackendService.BACKEND_URL, {
      sql: query
    });
  }
}
