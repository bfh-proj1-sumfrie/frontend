var FileSaver = require("file-saver");
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
