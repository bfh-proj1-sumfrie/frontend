<template>
  <div id="query-component">
    <div v-if="error !== ''">
      <v-alert :value="true" type="error">
        {{ error }}
      </v-alert>
    </div>
    <v-layout text-xs-center wrap>
      <!-- Side bar  -->
      <v-flex xs3 v-if="sideBarActive">
        <v-navigation-drawer stateless value="true" id="exampleNavigator">
          <v-list>
            <!-- Title -->
            <v-list-tile>
              <v-list-tile-title @click="sideBarActive = false"
                ><v-icon>fas fa-arrow-left</v-icon></v-list-tile-title
              >
              <v-btn
                left
                fab
                small
                color="transparent"
                dark
                v-on:click="showCustomQueryNamingDialog = true"
                ><v-icon>fas fa-save</v-icon></v-btn
              >
            </v-list-tile>

            <v-list-group
              :prepend-icon="queryCategory.icon_name"
              :value="false"
              v-for="queryCategory in queryExample"
              :key="queryCategory"
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>{{
                    queryCategory.main_title
                  }}</v-list-tile-title>
                </v-list-tile>
              </template>
              <v-list-tile
                v-for="query in queryCategory.queries"
                :key="query"
                @click="loadExampleQuery(query)"
              >
                <v-list-tile-title v-text="query.title"></v-list-tile-title>
              </v-list-tile>
            </v-list-group>
            <v-list-group
              v-if="userSavedQueries.length !== 0"
              prepend-icon="fas fa-folder-open"
              :value="true"
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>Custom queries</v-list-tile-title>
                </v-list-tile>
              </template>
              <v-list-tile
                v-for="(value, index) in userSavedQueries"
                :key="value"
                id="sampleQueries"
              >
                <v-list-tile-title
                  @click="loadExampleQuery(value)"
                  v-text="value.title"
                ></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon right @click="deleteQuery(index)"
                    >fas fa-trash-alt</v-icon
                  >
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs12>
        <!-- SQL query editor  -->
        <codemirror
          v-model="sqlQuery"
          :options="cmOptions"
          @input="onCmCodeChange"
          @ready="onCmReady"
        >
        </codemirror>
        <!-- Run query button  -->
        <v-btn
          block
          color="primary"
          dark
          v-on:click="runQuery()"
          class="run-button"
        >
          RUN
        </v-btn>
        <br />
        <div v-if="queryExecuting">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <!-- Warning notification if query has no entrys  -->
        <div v-if="sqlQuerySuccess !== '' && result.length <= 0">
          <div class="lastQuery">
            <v-alert :value="true" type="warning">
              <h3>No Results for query:</h3>
              {{ sqlQuerySuccess }}
            </v-alert>
          </div>
        </div>
        <!-- Success notification if query was ok  -->
        <div v-if="sqlQuerySuccess !== '' && result.length > 0">
          <div class="lastQuery">
            <v-alert :value="true" type="success">
              <h3>Results for query:</h3>
              {{ sqlQuerySuccess }}
            </v-alert>
          </div>
          <v-flex xs12>
            <!-- Table with results from query  -->
            <v-data-table
              :headers="headers"
              :items="result"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
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
            <!-- Export results as csv button  -->
            <v-flex class="xs2 pt-2" d-fley>
              <v-btn
                fab
                small
                color="primary"
                dark
                v-on:click="saveAsCsv(result)"
              >
                <v-icon>fas fa-file-csv</v-icon>
              </v-btn>
            </v-flex>
            <!-- Pagination  -->
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
            <v-flex xs10> Page {{ page + 1 }} of {{ maxPage + 1 }} </v-flex>
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
        <v-dialog
          v-model="showDetailView"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <!-- Close detailview  -->
              <v-btn icon dark @click="showDetailView = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title
                ><v-icon>fa fa-info-circle</v-icon> Details</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <!-- Export entry as csv  -->
              <v-toolbar-items>
                <v-btn dark flat @click="saveAsCsv([itemForDetailView])"
                  ><v-icon>fas fa-file-csv</v-icon></v-btn
                >
              </v-toolbar-items>
            </v-toolbar>
            <br /><br />
            <v-layout class="wrap">
              <v-flex
                class="xs12 sm6 md4 lg3 pl-5 pt-3"
                v-for="i in headers.length"
                :key="i"
              >
                <h3>{{ headers[i - 1].value + ":" }}</h3>
                {{ itemForDetailView[headers[i - 1].value] }}
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-layout>
    <v-btn
      absolute
      dark
      round
      top
      left
      color="primary"
      @click="sideBarActive = true"
      v-if="!sideBarActive"
      id="floatingButton"
      ><v-icon right>fas fa-arrow-right</v-icon></v-btn
    >
    <!-- Popup to enter save name -->
    <v-dialog v-model="showCustomQueryNamingDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Save</v-card-title>
        <v-text-field
          clearable
          label="Name"
          single-line
          maxlength="15"
          hint="Enter name to save your query"
          :autofocus="true"
          :value="nameCustomQuery"
          @keyup.enter="saveQuery()"
          @input="
            value => {
              nameCustomQuery = value;
            }
          "
        ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" flat="flat" @click="saveQuery()">
            Save
          </v-btn>

          <v-btn
            color="primary"
            flat="flat"
            @click="
              showCustomQueryNamingDialog = false;
              nameCustomQuery = '';
            "
          >
            Discard
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    nameCustomQuery: "",
    result: [],
    text: "",
    buttonPreviousDisabled: true,
    buttonNextDisabled: true,
    pageSize: "10",
    itemForDetailView: [],
    showDetailView: false,
    sideBarActive: false,
    maxPage: 0,
    page: 0,
    pageSizes: ["10", "50", "100"],
    pagination: {},
    headers: [],
    sqlQuery: "select * from block;",
    sqlQuerySuccess: "",
    queryExecuting: false,
    error: "",
    showCustomQueryNamingDialog: false,
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
    },
    userSavedQueries: []
  }),
  methods: {
    async loadExampleQuery(input) {
      this.sqlQuery = input.query;
    },
    async detailItem(item) {
      this.itemForDetailView = item;
      this.showDetailView = true;
    },
    saveAsCsv(data) {
      FileService.generateCSV(data);
    },
    async checkPaginationButton() {
      this.buttonNextDisabled = !(this.maxPage > this.page);
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
        this.error = e.response.data.message;
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
      if (this.nameCustomQuery === "") this.nameCustomQuery = "unnamed query";
      this.userSavedQueries.push({
        title: this.nameCustomQuery,
        query: this.sqlQuery
      });
      localStorage.userSavedQueries = JSON.stringify(this.userSavedQueries);
      this.showCustomQueryNamingDialog = false;
      this.nameCustomQuery = "";
    },
    deleteQuery(index) {
      this.userSavedQueries.splice(index, 1);
      localStorage.userSavedQueries = JSON.stringify(this.userSavedQueries);
    },
    async readQuery(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.sqlQuery = e.target.result);
      let l = reader.readAsText(file);
    },

    onCmCodeChange(newCode) {
      this.sqlQuery = newCode;
    },
    onCmReady(cm) {
      cm.on("keypress", () => {
        cm.showHint({ completeSingle: false });
      });
    },
    executeTheSearch() {
      let s = decodeURI(this.searchString);
      this.sqlQuery =
        "SELECT * FROM block \nWHERE\n  block_hash = '" +
        s +
        "'  \nOR\n  id = '" +
        s +
        "';";
      this.runQuery();
    }
  },
  created: function() {
    if (typeof this.searchString !== "undefined") {
      this.executeTheSearch();
    }
  },
  props: {
    searchString: String
  },
  mounted() {
    if (typeof localStorage !== "undefined" && localStorage.userSavedQueries) {
      this.userSavedQueries = JSON.parse(localStorage.userSavedQueries);
    }
  }
};
</script>

<style>
.run-button {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
}
.CodeMirror {
  text-align: left;
  font-size: 1.6rem;
}
#floatingButton {
  position: absolute;
  top: 15px;
  left: -30px;
  width: 20px;
}
#exampleNavigator {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
}

#sampleQueries:hover {
  background-color: #515151;
}

.CodeMirror-hints {
  position: absolute;
  z-index: 0;
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
  z-index: 0;
}

.v-alert > div > h3 {
  color: white;
  font-weight: bold;
}
</style>
