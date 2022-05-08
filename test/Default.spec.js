import { mount } from '@vue/test-utils'
import Index from '@/layouts/default.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})