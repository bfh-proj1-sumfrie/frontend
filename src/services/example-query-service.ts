/**

 Author: Elias Summermatter & Jan Friedli
 Date: 28.05.2019

 Licence:
 This file is part of BloSQL.

 BloSQL is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 BloSQL is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.

 External Content:
 Code partly adapted from:
  - http://blockchainsql.io/

 **/

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
      },
      {
        main_title: "Scripts",
        icon_name: "home",
        queries: [
          {
            active: false,
            title: "View Script",
            query:
              "SELECT\n  O.[Name] Name,\n SI.[DataLE] Data,\n  TXT.[en] Txt\nFROM\n ScriptInstruction SI INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name\nWHERE\n  SI.ScriptID = 243021301 -- Script ID (database)"
          },
          {
            active: false,
            title: "View Input Script (by TXID)",
            query:
              "SELECT\n  O.[Name] Name,\n SI.DataLE\n  Data,\n  TXT.en Txt\nFROM\n transaction T INNER JOIN\n TransactionInput TXI ON T.ID = TXI.TransactionID INNER JOIN\n  Script S ON S.ID = TXI.ScriptID INNER JOIN\n ScriptInstruction SI ON S.ID = SI.ScriptID INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name\nWHERE\n  T.TXID = 0x67F222EF921D8021EB740A87AE0A52637568E96D7FCC2DA78EE6FB167B08FCF9 AND -- TXID (prefix with 0x)\n TXI.[Index] = 0     -- Input index"
          },
          {
            active: false,
            title: "View Input Script (by height)",
            query:
              "SELECT\n  O.[Name] Name,\n SI.[DataLE] Data,\n  TXT.[en] Txt\nFROM\n [Transaction] T INNER JOIN\n TransactionInput TXI ON T.ID = TXI.TransactionID INNER JOIN\n  Script S ON S.ID = TXI.ScriptID INNER JOIN\n ScriptInstruction SI ON S.ID = SI.ScriptID INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name INNER JOIN\n  Block B ON T.BlockID = B.ID"
          },
          {
            active: false,
            title: "View Output Script (by transaction id)",
            query:
              "SELECT\n  O.[Name] Name,\n SI.[DataLE] Data,\n  TXT.[en] Txt\nFROM\n [Transaction] T INNER JOIN\n TransactionOutput TXO ON T.ID = TXO.TransactionID INNER JOIN\n Script S ON S.ID = TXO.ScriptID INNER JOIN\n ScriptInstruction SI ON S.ID = SI.ScriptID INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name\nWHERE\n  T.ID = 135510789 AND -- Transaction ID (database)\n  TXO.[Index] = 0     -- Output index"
          },
          {
            active: false,
            title: "View Output Script (by TXID)",
            query:
              "SELECT\n  O.[Name] Name,\n SI.[DataLE]\n  Data,\n  TXT.[en] Txt\nFROM\n [Transaction] T INNER JOIN\n TransactionOutput TXO ON T.ID = TXO.TransactionID INNER JOIN\n Script S ON S.ID = TXO.ScriptID INNER JOIN\n ScriptInstruction SI ON S.ID = SI.ScriptID INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name\nWHERE\n  T.TXID = 0x67F222EF921D8021EB740A87AE0A52637568E96D7FCC2DA78EE6FB167B08FCF9 AND -- TXID (prefix with 0x)\n TXO.[Index] = 0     -- Output index"
          },
          {
            active: false,
            title: "View Output Script (by transaction index)",
            query:
              "SELECT\n  O.[Name] Name,\n SI.[DataLE] Data,\n  TXT.[en] Txt\nFROM\n [Transaction] T INNER JOIN\n TransactionOutput TXO ON T.ID = TXO.TransactionID INNER JOIN\n Script S ON S.ID = TXO.ScriptID INNER JOIN\n ScriptInstruction SI ON S.ID = SI.ScriptID INNER JOIN\n  OpCode O ON SI.OpCode = O.ID INNER JOIN\n  [Text] TXT ON O.[Description] = TXT.Name INNER JOIN\n  Block B ON T.BlockID = B.ID\nWHERE\n  B.Height = 416079 AND   -- Block height\n  T.[Index] = 0 AND       -- Transaction index\n TXO.[Index] = 0         -- Output index"
          }
        ]
      },
      {
        main_title: "Addresses",
        icon_name: "home",
        queries: [
          {
            active: false,
            title: "Deposits",
            query:
              "SELECT\n  B.TimeStampUtc AS [DateTime],\n  TXO.Value / 100000000.0 AS AmountBTC,\n  B.ID AS BlockID,\n B.Height AS BlockHeight,\n TX.ID AS TransactionID,\n  TX.TXID AS TransactionTXID,\n  TXO.[Index] AS OutputIndex,\n  TXO.ID AS OutputID \nFROM\n TransactionOutput TXO INNER JOIN\n [Transaction] TX ON TXO.TransactionID = TX.ID INNER JOIN\n Block B ON TX.BlockID = B.ID \nWHERE\n  TXO.ToAddress = '1ByuFFiYvgKFkAFuY1bxHTj8tqSsCBaF2B' AND   -- Address deposited into\n B.BranchID = 1\n"
          },
          {
            active: false,
            title: "Withdrawals",
            query:
              "SELECT\n  B.TimeStampUtc AS [DateTime],\n  TXI.Value / 100000000.0 AS AmountBTC,\n  B.ID AS BlockID,\n B.Height AS BlockHeight,\n TX.ID AS TransactionID,\n  TX.TXID AS TransactionTXID,\n  TXI.[Index] AS InputIndex \nFROM\n TransactionInput TXI INNER JOIN\n  TransactionOutput TXO ON TXI.TransactionOutputID = TXO.ID INNER JOIN\n [Transaction] TX ON TXI.TransactionID = TX.ID INNER JOIN\n Block B ON TX.BlockID = B.ID \nWHERE\n  TXO.ToAddress = '1ByuFFiYvgKFkAFuY1bxHTj8tqSsCBaF2B' AND -- Address withdrawn from\n B.BranchID = 1 "
          }
        ]
      }
    ];
  }
}
