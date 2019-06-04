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
 along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.

 External Content:
 Code partly adapted from:
 - https://fernandobasso.github.io/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html

 **/

import { expect } from "chai";
import QueryResultTable from "@/components/QueryResultTable.vue";
import { shallowMount } from "@vue/test-utils";

describe("QueryResultTable Component Test", () => {
  it("should show a loader", () => {
    // render the component
    const wrapper = shallowMount(QueryResultTable, {
      data: () => ({
        queryExecuting: true
      })
    });

    expect(wrapper.findAll("v-progress-circular-stub").length).eq(1);
  });

  it("should show an error", () => {
    // render the component
    const wrapper = shallowMount(QueryResultTable, {
      data: () => ({
        error: "some error",
        queryExecuting: false
      }),
      propsData: {
        query: "a query"
      }
    });

    console.log(wrapper);
    expect(wrapper.findAll("v-alert-stub").length).eq(1);
  });
});
