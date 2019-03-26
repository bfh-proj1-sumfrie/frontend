import axios from "axios";
import config from "../../config";

export default class BackendService {
  /**
   *
   * @param query
   */
  static async runSql(query: string) {
    return await axios.post(config.api + "/query", {
      sql: query
    });
  }
}
