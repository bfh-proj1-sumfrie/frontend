import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
const VueCodemirror = require("vue-codemirror");
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
