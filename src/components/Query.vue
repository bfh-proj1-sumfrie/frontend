<template>
  <div id="query-component">
    <v-layout text-xs-center wrap>
      <!-- Side bar  -->
      <Sidebar
        v-on:saveCustomQuery="showCustomQueryNamingDialog = true"
        v-on:loadCustomQuery="loadCustomQuery"
      >
      </Sidebar>
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

    <!-- Popup to enter save name for custom query -->
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
import Sidebar from "./Sidebar";

export default {
  components: { Sidebar, QueryResultTable, codemirror },
  data: () => ({
    queryToRun: "",
    showCustomQueryNamingDialog: false,
    nameCustomQuery: "",
    sqlQuery: config.defaultQuery,
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
    },
    loadQuery(input) {
      this.sqlQuery = input.query;
    },
    saveQuery() {
      this.$store.dispatch("addCustomUserQuery", {
        queryString: this.sqlQuery,
        title: this.nameCustomQuery
      });
      this.showCustomQueryNamingDialog = false;
      this.nameCustomQuery = "";
    },
    loadCustomQuery(customQuery) {
      this.sqlQuery = customQuery.query;
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
  mounted() {}
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
