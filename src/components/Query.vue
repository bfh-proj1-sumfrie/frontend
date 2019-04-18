<template>
  <div id="query-component">
    <div v-if="error !== ''">
      <v-alert type="error">
        {{ error }}
      </v-alert>
    </div>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-flex class="text-xs-right" xs12>
          <v-btn fab small color="primary" dark v-on:click="saveQuery()"
            ><v-icon>fas fa-save</v-icon></v-btn
          >
          <v-btn fab small color="primary" dark>
          <label class="text-reader">
            <v-icon>fas fa-upload</v-icon>
            <input type="file" @change="readQuery">
          </label>
          </v-btn>
        </v-flex>
        <codemirror
          v-model="sqlQuery"
          :options="cmOptions"
          @input="onCmCodeChange"
          @ready="onCmReady"
        >
        </codemirror>
        <v-btn block color="primary" dark v-on:click="runQuery()"
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
              hide-actions
            >
              <template v-slot:no-data>
                <v-alert color="error" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
              <template slot="items" slot-scope="myprops">
                <tr @click="detailItem(myprops.item)">
                  <td v-for="header in headers" v-bind:key="header.id">
                    {{ myprops.item[header.value] }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
          <v-layout
            align-start
            justify-end
            row
            class="text-xs-center"
            :key="11"
          >
            <v-flex class="xs2 pt-2"  d-fley>
              <v-btn fab small color="primary" dark v-on:click="saveAsCsv(result)">
                <v-icon>fas fa-file-csv</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs10 sm2 d-flex>
              <v-select
                :items="pageSizes"
                :label="pageSize"
                height="2em"
                @selected="changePageSize"
                @change="changePageSize"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
            <v-flex xs1>
              <v-btn
                :disabled="buttonPreviousDisabled"
                flat
                icon
                v-on:click="previousPage()"
              >
                <v-icon>fa fa-arrow-circle-left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs1>
              <h2>Page {{ page + 1 }}</h2>
            </v-flex>
            <v-flex xs1>
              <v-btn
                :disabled="buttonNextDisabled"
                flat
                icon
                v-on:click="nextPage()"
              >
                <v-icon>fa fa-arrow-circle-right</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <!-- detail view  -->
      <v-layout row justify-center>
        <v-dialog v-model="showDetailView" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="showDetailView = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title><v-icon>fa fa-info-circle</v-icon> Details</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click="saveAsCsv([itemForDetailView])"><v-icon>fas fa-file-csv</v-icon></v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <br><br>
            <v-layout class="wrap" v-for="i in parseInt(headers.length/3)+1" :key="i">
              <v-flex class="xs4 pl-5 pt-3" v-if="headers[i]">
                <h3>{{ headers[i].value + ":"}}</h3> {{ itemForDetailView[headers[i].value]}}
              </v-flex>
              <v-flex class="xs4 pt-3" v-if="headers[i+1]">
                <h3>{{ headers[i+1].value + ":"}}</h3> {{ itemForDetailView[headers[i+1].value]}}
              </v-flex>
              <v-flex class="xs4 pt-3" v-if="headers[i+2]">
                <h3>{{ headers[i+2].value + ":"}}</h3> {{ itemForDetailView[headers[i+2].value]}}
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-layout>
      <!-- detail view  -->
    </v-layout>
  </div>
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
    text: "",
    buttonPreviousDisabled: true,
    buttonNextDisabled: true,
    pageSize: "10",
    itemForDetailView:[],
    showDetailView: false,
    maxPage: 0,
    page: 0,
    pageSizes: ["10", "50", "100"],
    pagination: {},
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
    async detailItem(item) {
      this.itemForDetailView = item
      this.showDetailView=true
    },
    saveAsCsv(data) {
      FileService.generateCSV(data)
    },
    async checkPaginationButton() {
      this.buttonNextDisabled = !(this.maxPage - 1 > this.page);
      this.buttonPreviousDisabled = !(this.page > 0);
    },
    async changePageSize(pagesize) {
      this.pageSize = pagesize;
      this.page = 0;
      this.runQuery(false);
    },
    async nextPage() {
      this.page++;
      this.runQuery(false);
    },

    async previousPage() {
      if (this.page > 0) {
        this.page--;
        this.runQuery(false);
      }
    },
    async runQuery(isNewQuery = true) {
      let rawResult;
      this.queryExecuting = true;
      this.sqlQuerySuccess = "";
      if (isNewQuery) this.page = 0;
      try {
        rawResult = await BackendService.runQuery(
          this.sqlQuery,
          this.page,
          this.pageSize
        );
      } catch (e) {
        this.error = e.response.data.error || e.response.data.message;
        this.queryExecuting = false;
        return;
      }
      this.maxPage = rawResult.data.pagination.max_pages;
      this.result = rawResult.data.data;
      this.error = "";
      this.headers = [];
      for (let k in this.result[0]) {
        this.headers.push({ text: k, value: k });
      }
      this.sqlQuerySuccess = this.sqlQuery;
      this.queryExecuting = false;

      this.checkPaginationButton();
    },
    async saveQuery() {
      FileService.savefile(this.sqlQuery,"query.sql");
    },
    async readQuery(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.sqlQuery =e.target.result;
      let l = reader.readAsText(file);
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
}
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

/* File reader*/
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
/* File reader*/

</style>
