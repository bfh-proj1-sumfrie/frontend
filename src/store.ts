import Vue from "vue";
import Vuex from "vuex";
import CustomQueryService from "./services/custom-query-service";

Vue.use(Vuex);

const state = {
  customUserQueries: CustomQueryService.getQueriesFromLocalStorage()
};

const mutations = {
  addCustomUserQuery(state, payload) {
    console.log("store", payload);
    state.customUserQueries = CustomQueryService.saveQuery(
      payload.queryString,
      payload.title
    );
  },
  removeCustomUserQuery(state, payload) {
    state.customUserQueries = CustomQueryService.deleteQuery(payload.index);
  }
};

const actions = {
  setCustomUserQueries: ({ commit }, payload) =>
    commit("setCustomUserQueries", payload),
  addCustomUserQuery: ({ commit }, payload) =>
    commit("addCustomUserQuery", payload),
  removeCustomUserQuery: ({ commit }, payload) =>
    commit("removeCustomUserQuery", payload)
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
});
