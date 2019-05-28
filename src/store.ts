import Vue from "vue";
import Vuex from "vuex";
import {
  CustomQueryService,
  CustomQueryIface
} from "./services/custom-query-service";

Vue.use(Vuex);

interface stateIface {
  customUserQueries: CustomQueryIface[];
}

const state = {
  customUserQueries: CustomQueryService.getQueriesFromLocalStorage()
};

const mutations = {
  addCustomUserQuery(
    state: stateIface,
    payload: { queryString: string; title: string }
  ) {
    state.customUserQueries = CustomQueryService.saveQuery(
      payload.queryString,
      payload.title
    );
  },
  removeCustomUserQuery(state: stateIface, payload: { index: number }) {
    state.customUserQueries = CustomQueryService.deleteQuery(payload.index);
  }
};

interface CommitIface {
  commit(
    mutation: string,
    payload: CustomQueryIface[] | CustomQueryIface | KeyIface
  ): void;
}

interface KeyIface {
  index: number;
}

const actions = {
  setCustomUserQueries: (
    { commit }: CommitIface,
    payload: CustomQueryIface[]
  ) => commit("setCustomUserQueries", payload),
  addCustomUserQuery: ({ commit }: CommitIface, payload: CustomQueryIface) =>
    commit("addCustomUserQuery", payload),
  removeCustomUserQuery: ({ commit }: CommitIface, payload: KeyIface) =>
    commit("removeCustomUserQuery", payload)
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
});
