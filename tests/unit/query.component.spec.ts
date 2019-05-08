import { expect } from "chai";
import QueryComponent from "@/components/Query.vue";
import { shallowMount } from "@vue/test-utils";

describe("Query Component Test", () => {
  it("test default value", () => {
    // render the component
    const wrapper = shallowMount(QueryComponent);
    expect(wrapper.find("codemirror-stub").attributes("value")).eq(
      "select * from block;"
    );
    expect(
      wrapper
        .findAll("v-btn-stub")
        .at(0)
        .text()
    ).eq("RUN");
  });

  it("should show a loader", () => {
    // render the component
    const wrapper = shallowMount(QueryComponent, {
      data: () => ({
        queryExecuting: true
      })
    });

    expect(wrapper.findAll("v-progress-circular-stub").length).eq(1);
  });

  it("should show an error", () => {
    // render the component
    const wrapper = shallowMount(QueryComponent, {
      data: () => ({
        error: "some error"
      })
    });

    expect(
      wrapper
        .findAll("v-alert-stub")
        .at(0)
        .text()
    ).eq("some error");
  });
});
