import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '@/stores/toast/toast';
import ToastContainer from '@/components/ui/ToastContainer.vue';

describe('ToastContainer', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Test 1: Basis Rendering
  it('renders toast messages from store', () => {
    const store = useToastStore();
    
    store.toasts = [
      { id: 1, message: 'Success!', type: 'success' },
      { id: 2, message: 'Error!', type: 'error' }
    ];
    
    const wrapper = mount(ToastContainer);

    expect(wrapper.text()).toContain('Success!');
    expect(wrapper.text()).toContain('Error!');
  });

  // Test 2: CSS Logic
  it('applies correct CSS classes for each toast type', () => {
    const wrapper = mount(ToastContainer);

    expect(wrapper.vm.toastType({ type: 'success' })).toBe('bg-green-600');
    expect(wrapper.vm.toastType({ type: 'error' })).toBe('bg-red-600');
    expect(wrapper.vm.toastType({})).toBe('bg-gray-600');
  });

  // Test 3: Mehrere Toasts
  it('renders multiple toasts', () => {
    const store = useToastStore();
    
    store.toasts = [
      { id: 1, message: 'First', type: 'success' },
      { id: 2, message: 'Second', type: 'error' },
    ];
    
    const wrapper = mount(ToastContainer);

    expect(wrapper.text()).toContain('First');
    expect(wrapper.text()).toContain('Second');
    expect(wrapper.vm.toasts).toHaveLength(2);
  });
});