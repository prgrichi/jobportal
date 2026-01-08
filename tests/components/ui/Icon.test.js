import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from '@/components/ui/Icon.vue';

describe('Icon', () => {
  it('rendert SVG', () => {
    const wrapper = mount(Icon, { props: { name: 'Sun' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  })
});