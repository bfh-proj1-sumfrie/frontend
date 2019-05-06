export default class exampleQueryService {
  /**
   *
   * @param query
   */
  static getExample() {
    return [
      { title: 'All Blocks', query: 'SELECT * FROM block ORDER BY ID' },
      { title: 'Latest Blocks', query: 'SELECT * FROM block ORDER BY Height DESC' },
      { title: 'Generous Blocks', query: 'SELECT ID, FeesBTC, Hash FROM block ORDER BY FeesBTC DESC' },
      { title: 'Genesis Block', query: 'SELECT * FROM block WHERE PreviousBlockHash = 0x0000000000000000000000000000000000000000000000000000000000000000'},
      { title: 'Orphan Count', query: 'SELECT COUNT(*) AS NumOrphans FROM block where BranchID <> 1'},
      { title: 'Orphaned Blocks', query: 'SELECT * FROM block WHERE BranchID <> 1 '}
    ]
  }
}
