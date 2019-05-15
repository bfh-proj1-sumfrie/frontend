import Vue from "vue";
import Vuex from "vuex";
import CustomQueryService from "./services/custom-query-service";

Vue.use(Vuex);

const state = {
  customUserQueries: CustomQueryService.getQueriesFromLocalStorage()
};

const mutations = {
  addCustomUserQuery (state, newQuery) {
    state.customUserQueries.push(newQuery)
  },
  removeCustomUserQuery (state, index) {
    state.customUserQueries.splice(index, 1);
  }
};

const actions = {
  addCustomUserQuery: ({ commit }) => commit('addCustomUserQuery'),
  removeCustomUserQuery: ({ commit }) => commit('removeCustomUserQuery'),
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
});
