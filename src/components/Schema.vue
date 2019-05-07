<template>
  <div id="schema-component">
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
              v-for="i in itemForDetailView.columns"
              v-bind:key="i"
            >
              <h2>{{ i.Field }}:</h2>
              <h5>Type:</h5>
              {{ i.Type }}
              <h5>Default:</h5>
              {{ i.Default || "null" }}
              <h5>Extra:</h5>
              {{ i.Extra || "null" }}
              <h5>Key:</h5>
              {{ i.Key || "null" }}
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
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
      console.log(this.tables);
    }
  },
  created: function() {
    this.getSchema();
  }
};
</script>
