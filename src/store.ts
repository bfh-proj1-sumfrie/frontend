/**

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
along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

External Content:
    Code is partly adapted from: https://vuex.vuejs.org/guide/state.html
    Code is partly adapted from: https://vuex.vuejs.org/guide/getters.html

**/
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
