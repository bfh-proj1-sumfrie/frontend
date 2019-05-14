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
          v-on:click="queryToRun = sqlQuery"
          class="run-button"
        >
          RUN
        </v-btn>
        <br />
        <QueryResultTable v-bind:query="queryToRun"></QueryResultTable>
      </v-flex>
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
import QueryResultTable from "./QueryResultTable";
import config from "../../config";

export default {
  components: { QueryResultTable, codemirror },
  data: () => ({
    nameCustomQuery: "",
    sideBarActive: false,
    queryToRun: "",
    error: "",
    text: "",
    sqlQuery: config.defaultQuery,
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

.CodeMirror-scroll,
.CodeMirror-hscrollbar {
  z-index: 0;
}

.v-alert > div > h3 {
  color: white;
  font-weight: bold;
}
</style>
