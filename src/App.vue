<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="logofont">BLO</span>
        <span class="font-weight-light logofont">SQL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="white" href="https://github.com/bfh-proj1-sumfrie" target="_blank">
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <QueryComponent />
    </v-content>
  </v-app>
</template>

<script>
import QueryComponent from "./components/Query";

export default {
  name: "App",
  components: {
    QueryComponent
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Righteous");

.logofont {
  font-family: "Righteous", cursive;
  font-size: 2.5rem;
}
.theme--dark.application {
  background: #777777;
}
</style>
