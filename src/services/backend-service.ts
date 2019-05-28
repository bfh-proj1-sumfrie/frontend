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
