import { expect } from "chai";
import App from "../../src/App.vue";
import { shallowMount } from "@vue/test-utils";

describe("Main ", () => {
  it("navbar test", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.find("v-toolbar-stub").text()).contains("fa-github");
    expect(wrapper.find("v-toolbar-title-stub").text()).contains("BLOSQL");
  });
});
