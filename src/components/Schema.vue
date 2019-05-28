<template>
  <div id="schema-component">
    <v-container fluid>
      <v-layout column>
        <v-flex xs12>
          <h1>Database Schema</h1>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="tables"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td class="text-xs-left" @click="detailTable(props.item)">
                {{ props.item.table_name }}
              </td>
            </template>
          </v-data-table>

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
                    ><v-icon>fa fa-info-circle</v-icon>
                    {{ itemForDetailView.table_name }}</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                </v-toolbar>
                <br /><br />
                <v-layout class="wrap">
                  <v-flex
                    class="xs12 sm6 md4 lg3 pl-5 pt-3"
                    v-for="col in itemForDetailView.columns"
                    v-bind:key="col.key"
                  >
                    <h2>{{ col.Field }}:</h2>
                    <h5>Type:</h5>
                    {{ col.Type }}
                    <h5>Default:</h5>
                    {{ col.Default || "null" }}
                    <h5>Extra:</h5>
                    {{ col.Extra || "null" }}
                    <h5>Key:</h5>
                    {{ col.Key || "null" }}
                  </v-flex>
                </v-layout>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import BackendService from "../services/backend-service";

export default {
  data: () => ({
    headers: [{ text: "TableName", value: "table_name" }],
    tables: [],
    showDetailView: false,
    itemForDetailView: ""
  }),
  methods: {
    async detailTable(item) {
      this.itemForDetailView = item;
      this.showDetailView = true;
    },
    async getSchema() {
      this.tables = (await BackendService.getSchema()).data;
    }
  },
  created: function() {
    this.getSchema();
  }
};
</script>
