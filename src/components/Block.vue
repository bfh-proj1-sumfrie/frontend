<template>
  <div id="block-component">
    <v-container fluid>
      <v-layout column>
        <v-flex xs12>
          <h1>Block Explorer</h1>
        </v-flex>
        <v-flex xs12>
          <QueryResultTable
            v-bind:query="query"
            v-bind:is-static="true"
          ></QueryResultTable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import QueryResultTable from "./QueryResultTable";
import config from "../../config";

export default {
  components: { QueryResultTable },
  data: () => ({
    query: config.defaultQuery
  })
};
</script>
