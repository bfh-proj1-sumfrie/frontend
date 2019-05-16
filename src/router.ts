import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Query from "./components/Query.vue";
import Schema from "./components/Schema.vue";
import Block from "./components/Block.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search/:searchString",
      name: "home",
      component: Query,
      props: true
    },
    {
      path: "/schema",
      name: "schema",
      component: Schema
    },
    {
      path: "/explorer",
      name: "explorer",
      component: Block
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
