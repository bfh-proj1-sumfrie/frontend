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
