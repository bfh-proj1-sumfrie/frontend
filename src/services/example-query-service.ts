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
          {
            title: "All Blocks",
            query: "SELECT * FROM block ORDER BY ID",
            active: true
          },
          {
            active: true,
            title: "Latest Blocks",
            query: "SELECT * FROM block ORDER BY Height DESC"
          },
          {
            active: true,
            title: "Generous Blocks",
            query: "SELECT id, bits, block_hash FROM block ORDER BY bits DESC"
          },
          {
            active: true,
            title: "Genesis Block",
            query:
              "SELECT * FROM block WHERE prev_block_hash = 0x0000000000000000000000000000000000000000000000000000000000000000"
          },
          {
            active: true,
            title: "Orphan Count",
            query: "SELECT COUNT(*) AS NumOrphans FROM block where id <> 1"
          },
          {
            active: true,
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
            active: true,
            title: "All Transactions",
            query: "SELECT * FROM transaction"
          },
          {
            active: true,
            title: "Transactions by ID",
            query: "SELECT * FROM transaction WHERE id = 343 -- Set ID here"
          },
          {
            active: true,
            title: "Transactions by txhash",
            query:
              "SELECT * FROM transaction\nWHERE txhash = 0xDAC1077FF75C677E3E0E7F9028DA813D63F8A57C938F5A8934BB5E61A320ECDC -- Set TXID here (prefix with 0x)"
          },
          {
            active: true,
            title: "Block Transactions(block database ID)",
            query:
              "SELECT\n  T.*\nFROM\n  transaction T INNER JOIN\n  block B ON T.block_id = B.id\n WHERE\n  B.ID = 1000 -- Block database ID"
          },
          {
            active: true,
            title: "Block Transactions(block height)",
            query:
              "SELECT\n T.*\n FROM\n transaction T INNER JOIN\n  block B ON T.block_id = B.id\nWHERE\n  B.Height = 100000   -- Bock height"
          },
          {
            active: true,
            title: "Block Transactions(block hash)",
            query:
              "SELECT\n  T.*\nFROM\n transaction T INNER JOIN\n block B ON T.block_id = B.id\nWHERE\n  B.block_hash = 0x00000000000000000570DA410CA91C6E27E92B5E8744C999A93A9663538F312A -- Block hash here(prefix with 0x)-- bock hash here(prefix with 0x)"
          },
          {
            active: false,
            title: "Generous Transactions(slow)",
            query: "SELECT * FROM transaction ORDER BY FeeBTC DESC"
          }
        ]
      }
    ];
  }
}
