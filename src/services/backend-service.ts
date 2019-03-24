import axios from "axios";

export default class BackendService {
  static BACKEND_URL: string = "TO BE DEFINED";

  static runSql(query: string) {
    return BackendService.BACKEND_URL;
  }
}
