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
  <div id="sidebar-component">
    <v-btn
      absolute
      dark
      round
      top
      left
      color="primary"
      @click="sideBarActive = true"
      v-if="!sideBarActive"
      id="floatingButton"
    >
      <v-icon right>fas fa-arrow-right</v-icon>
    </v-btn>
    <v-flex xs3 v-if="sideBarActive">
      <v-navigation-drawer stateless value="true" id="sidebar-navigator">
        <v-list>
          <!-- Title -->
          <v-list-tile>
            <v-list-tile-title @click="sideBarActive = false"
              ><v-icon>fas fa-arrow-left</v-icon></v-list-tile-title
            >
            <v-btn
              left
              fab
              small
              color="transparent"
              dark
              v-on:click="saveACustomQuery()"
              ><v-icon>fas fa-save</v-icon></v-btn
            >
          </v-list-tile>

          <v-list-group
            :prepend-icon="queryCategory.icon_name"
            :value="false"
            :key="queryCategory.main_title"
            v-for="queryCategory in queryExamples"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{
                  queryCategory.main_title
                }}</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="query in queryCategory.queries"
              :key="query.title"
              @click="loadQuery(query)"
              :disabled="!query.active"
            >
              <v-list-tile-title v-text="query.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <v-list-group
            v-if="$store.state.customUserQueries.length !== 0"
            prepend-icon="fas fa-folder-open"
            :value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Custom queries</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(value, index) in $store.state.customUserQueries"
              :key="value.name"
              id="sampleQueries"
            >
              <v-list-tile-title
                @click="loadQuery(value)"
                v-text="value.title"
              ></v-list-tile-title>
              <v-list-tile-action>
                <v-icon
                  right
                  @click="
                    $store.dispatch('removeCustomUserQuery', { index: index })
                  "
                >
                  fas fa-trash-alt
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </v-flex>
  </div>
</template>

<script>
import exampleQueryService from "../services/example-query-service";

export default {
  data: () => ({
    sideBarActive: false,
    showCustomQueryNamingDialog: false,
    queryExamples: exampleQueryService.getExample()
  }),
  methods: {
    saveACustomQuery() {
      // notify parents to store any current query
      this.$emit("saveCustomQuery");
    },
    loadQuery(query) {
      // notify parents to load any current query
      this.$emit("loadCustomQuery", query);
    }
  }
};
</script>

<style>
#floatingButton {
  position: absolute;
  top: 15px;
  left: -30px;
  width: 20px;
  z-index: 1;
}
#sidebar-navigator {
  position: absolute;
  left: 0px;
  top: 0px;
}

#sampleQueries:hover {
  background-color: #515151;
}
</style>

