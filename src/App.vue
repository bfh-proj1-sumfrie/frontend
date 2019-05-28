<!--

Author: Elias Summermatter & Jan Friedli
Date: 28.05.2019

Licence:
This file is part of BloSQL.

BloSQL is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BloSQL is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.

External Content:
Code is partly adapted from:
 - https://vuetifyjs.com/en/components/api-explorer

-->

<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" to="/">
        <router-link to="/">
          <span class="logofont">BLO</span>
          <span class="font-weight-light logofont">SQL</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-flex xs12 sm6 md6 mr5>
          <v-text-field
            label="Search"
            hint="Address, hash, txid.."
            clearable
            @keyup.enter="search()"
            @input="
              value => {
                searchString = value;
              }
            "
          ></v-text-field>
        </v-flex>
        <v-btn flat color="white" to="/">
          <v-icon>fa fa-search</v-icon>
        </v-btn>
        <v-btn flat color="white" to="/schema">
          <v-icon>fa fa-database</v-icon>
        </v-btn>
        <v-btn flat color="white" to="/explorer">
          <v-icon>fa fa-window-maximize</v-icon>
        </v-btn>
        <v-btn flat color="white" to="/about">
          <v-icon>fa fa-info</v-icon>
        </v-btn>
        <v-btn
          flat
          color="white"
          href="https://github.com/bfh-proj1-sumfrie"
          target="_blank"
        >
          <v-icon>fab fa-github</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content transition="slide-x-transition">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchString: ""
      //
    };
  },
  methods: {
    search() {
      window.open("/search/" + encodeURI(this.searchString), "_blank");
    }
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
a,
u {
  text-decoration: none;
}
</style>
