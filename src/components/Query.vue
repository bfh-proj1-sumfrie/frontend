<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-textarea
          name="input-7-1"
          label="Default style"
          hint="Hint text"
          auto-grow
        ></v-textarea>
        <v-btn round color="primary" dark v-on:click="runSql()">Run</v-btn>
        <v-flex xs12>
          {{ result }}
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BackendService from "../services/backend-service";
export default {
  data: () => ({
    result: ""
  }),
  methods: {
    runSql() {
      this.result = BackendService.runSql();
    }
  }
};
</script>

<style></style>
