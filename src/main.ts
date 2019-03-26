import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
const VueCodemirror = require("vue-codemirror");
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import 'codemirror/mode/sql/sql.js'

// you can set default global options and events when use
Vue.use(
  VueCodemirror
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
