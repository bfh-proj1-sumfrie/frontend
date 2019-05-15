<template>
  <div class="query-result-table">
    <div v-if="queryExecuting">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="!queryExecuting && query !== ''">
      <!-- Warning notification if query has no entrys  -->
      <div v-if="error !== ''">
        <v-alert :value="true" type="error">
          {{ error }}
        </v-alert>
      </div>
      <div v-if="result.length <= 0">
        <div class="lastQuery">
          <v-alert :value="true" type="warning">
            <h3>No Results for query:</h3>
            {{ query }}
          </v-alert>
        </div>
      </div>
      <!-- Success notification if query was ok  -->
      <div v-if="result.length > 0 && !isStatic">
        <div class="lastQuery">
          <v-alert :value="true" type="success">
            <h3>Results for query:</h3>
            {{ query }}
          </v-alert>
        </div>
      </div>

      <div v-if="result.length > 0">
        <v-flex xs12>
          <!-- Table with results from query  -->
          <v-data-table
            :headers="headers"
            :items="result"
            class="elevation-1"
            hide-actions
          >
            <template slot="items" slot-scope="myprops">
              <tr @click="detailItem(myprops.item)">
                <td v-for="header in headers" v-bind:key="header.id">
                  {{ myprops.item[header.value] }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>

        <v-layout align-start justify-end row class="text-xs-center" :key="11">
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
                <v-toolbar-title>
                  <v-icon>
                    fa fa-info-circle
                  </v-icon>
                  Details
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- Export entry as csv  -->
                <v-toolbar-items>
                  <v-btn dark flat @click="saveAsCsv([itemForDetailView])">
                    <v-icon>fas fa-file-csv</v-icon>
                  </v-btn>
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
      </div>
    </div>
  </div>
</template>

<script>
import BackendService from "../services/backend-service";
import FileService from "../services/file-service";

export default {
  props: {
    query: {
      type: String,
      default: "" // intentionally left empty -> change detection needs any value
    },
    isStatic: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    query: function(newVal, oldVal) {
      this.runQuery(newVal);
    }
  },
  data: () => ({
    buttonPreviousDisabled: true,
    buttonNextDisabled: true,
    pageSize: "10",
    itemForDetailView: [],
    showDetailView: false,
    maxPage: 0,
    page: 0,
    pageSizes: ["10", "50", "100"],
    pagination: {},
    sqlQuerySuccess: "",
    queryExecuting: false,
    error: "",
    headers: [],
    result: []
  }),
  methods: {
    async detailItem(item) {
      this.itemForDetailView = item;
      this.showDetailView = true;
    },
    saveAsCsv(data) {
      console.log(this.query);
      FileService.generateCSV(data);
    },
    async checkPaginationButton() {
      this.buttonNextDisabled = !(this.maxPage > this.page);
      this.buttonPreviousDisabled = !(this.page > 0);
    },
    async changePageSize(pagesize) {
      this.pageSize = pagesize;
      this.page = 0;
      this.runQuery(this.query);
    },
    async nextPage() {
      this.page++;
      this.runQuery(this.query);
    },
    async previousPage() {
      if (this.page > 0) {
        this.page--;
        this.runQuery(this.query);
      }
    },
    async runQuery(query) {
      let rawResult;
      this.queryExecuting = true;
      try {
        rawResult = await BackendService.runQuery(
          query,
          parseInt(this.page),
          parseInt(this.pageSize)
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
      for (let header in this.result[0]) {
        this.headers.push({ text: header, value: header });
      }
      this.queryExecuting = false;

      this.checkPaginationButton();
    }
  },
  created: function() {
    if (this.isStatic) {
      this.runQuery(this.query);
    }
  }
};
</script>
