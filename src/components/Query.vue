<template>
  <v-container>
    <div v-if="error !== ''">
      <v-alert :value="true" type="error">
        {{ error }}
      </v-alert>
    </div>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <codemirror
          v-
          v-model="sqlQuery"
          :options="cmOptions"
          @input="onCmCodeChange"
          @ready="onCmReady"
        >
        </codemirror>
        <br>
        <v-btn round color="primary" dark v-on:click="runSql()">Run</v-btn>
        <v-btn round color="primary" dark v-on:click="saveQuery()">Save</v-btn>
        <div v-if="sqlQuerySuccess !== ''">
          <h3>Last query: {{ sqlQuerySuccess }}</h3>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="result"
              class="elevation-1"
              :rows-per-page-items="[
                10,
                50,
                100,
                { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
              ]"
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
              <template slot="items" slot-scope="myprops">
                <td v-for="header in headers" v-bind:key="header.id">
                  {{ myprops.item[header.value] }}
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BackendService from "../services/backend-service";
import FileService from "../services/file-service";
import exampleQueryService from "../services/example-query-service";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/display/placeholder";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/anyword-hint";
export default {
  data: () => ({
    result: [],
    headers: [],
    sqlQuery: "select * from block;",
    sqlQuerySuccess: "",
    error: "",
    queryExample: exampleQueryService.getExample(),
    cmOptions: {
      // codemirror options
      tabSize: 4,
      mode: "text/x-mariadb",
      theme: "darcula",
      lineNumbers: true,
      CodeMirror: {
        "font-size": "20px"
      }
    }
  }),
  methods: {
    async runSql() {
      let rawResult;
      try {
        rawResult = await BackendService.runSql(this.sqlQuery);
      } catch (e) {
        this.error = e.response.data.error || e.response.data.message;
        return;
      }
      this.result = rawResult.data;

      this.error = "";
      this.headers = [];
      for (let k in this.result[0]) {
        this.headers.push({ text: k, value: k });
      }
      this.sqlQuerySuccess = this.sqlQuery;
    },

    async saveQuery() {
      FileService.savefile(this.sqlQuery);
    },
    onCmCodeChange(newCode) {
      this.sqlQuery = newCode;
    },
    onCmReady(cm) {
      cm.on("keypress", () => {
        cm.showHint({ completeSingle: false });
      });
    }
  }
};
</script>

<style>
.CodeMirror {
  text-align: left;
  font-size: 1.8rem;
}

.CodeMirror-hints {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;

  margin: 0;
  padding: 2px;

  -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
  -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
  box-shadow: 2px 3px 5px rgba(0,0,0,.2);
  border-radius: 3px;
  border: 1px solid silver;

  background: white;
  font-size: 90%;
  font-family: monospace;

  max-height: 20em;
  overflow-y: auto;
}

.CodeMirror-hint {
  margin: 0;
  padding: 0 4px;
  border-radius: 2px;
  white-space: pre;
  color: #CC7832;
  font-size: 1.4em;
  cursor: pointer;
}

.CodeMirror-hint-active {
  background: #08f;
  color: white;
}
</style>
