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
      <v-icon right>fas fa-arrow-right</v-icon>
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
              @click="loadQuery(query)"
              :disabled="!query.active"
            >
              <v-list-tile-title v-text="query.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <v-list-group
            v-if="userSavedQueries.length !== 0"
            prepend-icon="fas fa-folder-open"
            :value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Custom queries</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(value, index) in getUserQueries"
              :key="value.name"
              id="sampleQueries"
            >
              <v-list-tile-title
                @click="loadQuery(value)"
                v-text="value.title"
              ></v-list-tile-title>
              <v-list-tile-action>
                <v-icon right @click="deleteQuery(index)">
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
import CustomQueryService from "../services/custom-query-service";

export default {
  data: () => ({
    sideBarActive: false,
    showCustomQueryNamingDialog: false,
    queryExamples: exampleQueryService.getExample()
  }),
  computed: {
    getUserQueries: function(){
      return CustomQueryService.getQueriesFromLocalStorage();
    }
  },
  methods: {
    saveACustomQuery() {
      // notify parents to store any current query
      this.$emit("saveCustomQuery");
      this.sideBarActive = false;
    },
    deleteQuery(index) {
      CustomQueryService.deleteQuery(index);
      this.userSavedQueries = CustomQueryService.getQueriesFromLocalStorage();
    },
    loadQuery(query) {
      this.$emit("loadCustomQuery", query);
    }
  },
  mounted() {
    if (typeof localStorage !== "undefined") {
      this.userSavedQueries = CustomQueryService.getQueriesFromLocalStorage();
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
}
#sidebar-navigator {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
}

#sampleQueries:hover {
  background-color: #515151;
}
</style>
