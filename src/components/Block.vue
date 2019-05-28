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
Code is partly adapted from: https://vuetifyjs.com/en/components/api-explorer

-->

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
