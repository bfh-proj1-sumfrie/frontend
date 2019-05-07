export default class exampleQueryService {
  /**
   *
   * @param query
   */
  static getExample() {
    return [
      {
        main_title: "Blocks",
        icon_name: "home",
        queries: [
          { title: "All Blocks", query: "SELECT * FROM block ORDER BY ID" },
          {
            title: "Latest Blocks",
            query: "SELECT * FROM block ORDER BY Height DESC"
          },
          {
            title: "Generous Blocks",
            query: "SELECT id, bits, block_hash FROM block ORDER BY bits DESC"
          },
          {
            title: "Genesis Block",
            query:
              "SELECT * FROM block WHERE prev_block_hash = 0x0000000000000000000000000000000000000000000000000000000000000000"
          },
          {
            title: "Orphan Count",
            query: "SELECT COUNT(*) AS NumOrphans FROM block where id <> 1"
          },
          {
            title: "Orphaned Blocks",
            query: "SELECT * FROM block WHERE BranchID <> 1 "
          }
        ]
      },
      {
        main_title: "Transactions",
        icon_name: "home",
        queries: [
          {
            title: "All Transactions",
            query: "SELECT * FROM transaction"
          },
          {
            title: "Transactions by TXID",
            query:
              "SELECT * FROM transaction\nWHERE txhash = 0xDAC1077FF75C677E3E0E7F9028DA813D63F8A57C938F5A8934BB5E61A320ECDC -- Set TXID here (prefix with 0x)"
          },
          {
            title: "Block Transactions (by block database ID)",
            query:
              "SELECT\n  T.*\nFROM\n  transaction T INNER JOIN\n  block B ON T.block_id = B.ID\n WHERE\n  B.ID = 1000 -- Block database ID"
          }
        ]
      }
    ];
  }
}
