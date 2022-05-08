import { mount } from '@vue/test-utils'
import NuxtLogo from '@/components/NuxtLogo.vue'
import Index from '@/layouts/default.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.vm).toBeTruthy()
  })
})