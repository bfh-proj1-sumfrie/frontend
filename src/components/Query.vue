<template>
  <v-container>
    <div v-if="error !== ''">
      <v-alert :value="true" type="error">
        {{ error }}
      </v-alert>
    </div>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <codemirror v-model="code" :options="cmOptions" @input="onCmCodeChange">
        </codemirror>
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
              <template slot="queryExample" slot-scope="myprops">
                <td v-for="header in headers" v-bind:key="header.id">
                  {{ myprops.item[header.value] }}
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </div>
        <v-flex xs12 sm6 d-flex>
          <v-select :items="queryExample" label="Solo field" solo></v-select>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BackendService from "../services/backend-service";
import FileService from "../services/file-service";
import exampleQueryService from "../services/example-query-service";

export default {
  data: () => ({
    result: [],
    headers: [],
    sqlQuery: "",
    sqlQuerySuccess: "",
    error: "",
    queryExample: exampleQueryService.getExample(),
    code: "const a = 10",
    cmOptions: {
      // codemirror options
      tabSize: 4,
      mode: "text/x-mariadb",
      theme: "darcula",
      lineNumbers: true,
      line: true,
      direction: "ltr"
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
      console.log("this is new code", newCode);
      this.code = newCode;
    }
  }
};
</script>

<style></style>
