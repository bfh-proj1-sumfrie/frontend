import { expect } from "chai";
import QueryComponent from "@/components/Query.vue";
import { shallowMount } from '@vue/test-utils'

describe("Query Component Test", () => {
  it('test default value', () => {
    // render the component
    const wrapper = shallowMount(QueryComponent);
    console.log(wrapper.find('codemirror-stub').attributes('value'))
    expect(wrapper.find('codemirror-stub').attributes('value')).eq('select * from block;');
    expect(wrapper.find('v-btn-stub').text()).eq('Run');
  })
});
