var FileSaver = require('file-saver');

export default class FileService {
  /**
   *
   * @param query
   */
  static async savefile(sql: string) {
    var blob = new Blob([sql], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "query.sql");
  }
}
