<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="logofont">BLO</span>
        <span class="font-weight-light logofont">SQL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/bfh-proj1-sumfrie"
        target="_blank"
      >
        <span class="mr-2">Github</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/Query";

export default {
  name: "App",
  components: {
    HelloWorld
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
  font-family: 'Righteous', cursive;
  font-size: 2.5rem;
}
.theme--dark.application {
  background: #777777;
}
</style>
