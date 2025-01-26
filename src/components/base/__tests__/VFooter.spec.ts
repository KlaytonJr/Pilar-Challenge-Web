import { describe, it, expect, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Components
import VFooter from '../VFooter.vue'

// Variables and constants
let wrapper: VueWrapper

describe('VFooter', () => {
  beforeEach(() => {
    wrapper = mount(VFooter)
  })

  it('Should render the logo text correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Movie Now')
  })

  it('Should render the footer text with author name', () => {
    expect(wrapper.find('h3').text()).toBe('made with ❤️ Klayton Jr')

    const span = wrapper.find('span')
    expect(span.classes()).toContain('font-bold')
  })
})
