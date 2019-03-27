<template>
  <v-container>
    <div v-if="error !== ''">
      <v-alert :value="true" type="error">
        {{ error }}
      </v-alert>
    </div>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-flex class="text-xs-right" xs12>
          <v-btn fab small color="primary" dark v-on:click="saveQuery()"
            ><v-icon>fas fa-save</v-icon></v-btn
          >
        </v-flex>
        <codemirror
          v-model="sqlQuery"
          :options="cmOptions"
          @input="onCmCodeChange"
          @ready="onCmReady"
        >
        </codemirror>
        <v-btn block color="primary" dark v-on:click="runSql()"
          ><h2>RUN</h2></v-btn
        >
        <br />
        <br />
        <div v-if="queryExecuting">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-if="sqlQuerySuccess !== ''">
          <div class="lastQuery">
            <h2>Last query: {{ sqlQuerySuccess }}</h2>
          </div>
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
import codemirror from "vue-codemirror/src/codemirror.vue";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/display/placeholder";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/anyword-hint";
export default {
  components: { codemirror },
  data: () => ({
    result: [],
    headers: [],
    sqlQuery: "select * from block;",
    sqlQuerySuccess: "",
    queryExecuting: false,
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
      this.queryExecuting = true;
      this.sqlQuerySuccess = "";
      try {
        rawResult = await BackendService.runSql(this.sqlQuery);
      } catch (e) {
        this.error = e.response.data.error || e.response.data.message;
        this.queryExecuting = false;
        return;
      }
      this.result = rawResult.data;

      this.error = "";
      this.headers = [];
      for (let k in this.result[0]) {
        this.headers.push({ text: k, value: k });
      }
      this.sqlQuerySuccess = this.sqlQuery;
      this.queryExecuting = false;
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
  font-size: 1.6rem;
}

.CodeMirror-hints {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;

  margin: 0;
  padding: 2px;

  -webkit-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
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
  color: #cc7832;
  font-size: 1.4em;
  cursor: pointer;
}

.CodeMirror-hint-active {
  background: #08f;
  color: white;
}
.lastQuery {
  text-align: left;
}
.CodeMirror-scroll {
  z-index: 1;
}
</style>
