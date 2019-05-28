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
 - Initial project generation
 - https://vuetifyjs.com/en/components/api-explorer

-->
<template>
  <div class="home">
    <QueryComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QueryComponent from "../components/Query.vue";

@Component({
  components: {
    QueryComponent
  }
})
export default class Home extends Vue {}
</script>
