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
