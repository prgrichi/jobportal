import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import Icon from '@/components/ui/Icon.vue';

describe('ToggleSwitch', () => {
  
  it('renders icons and label', () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Dark Mode' },
      global: {
        components: { Icon }
      }
    });
    
    expect(wrapper.findAll('svg').length).toBe(2);
    expect(wrapper.find('.sr-only').text()).toBe('Dark Mode');
  });

  it('emits event on click', async () => {
    const wrapper = mount(ToggleSwitch, {
      global:  {
        stubs: { Icon: true }
      }
    });
    
    await wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });
});