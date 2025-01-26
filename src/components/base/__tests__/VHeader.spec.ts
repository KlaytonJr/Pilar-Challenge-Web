import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'

// Components
import VHeader from '../VHeader.vue'
import SearchInput from '../SearchInput.vue'

// Variables and constants
let wrapper: VueWrapper

describe('VHeader', () => {
  beforeEach(() => {
    wrapper = mount(VHeader, {
      global: {
        plugins: [router],
        stubs: ['SearchInput'],
      },
    })
  })

  it('Should render the logo text correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Movie Now')
  })

  it('Should contains all navigation links', () => {
    const links = wrapper.findAll('nav a')
    expect(links).toHaveLength(3)
    expect(links[0].text()).toBe('Home')
    expect(links[1].text()).toBe('Filmes')
    expect(links[2].text()).toBe('Séries')
  })

  it('Should includes SearchInput component', () => {
    expect(wrapper.findComponent(SearchInput).exists()).toBe(true)
  })

  it('Should navigates to correct route when clicking links', async () => {
    const push = vi.spyOn(router, 'push')

    const movieLink = wrapper.findAll('nav a')[1]
    await movieLink.trigger('click')

    expect(push).toHaveBeenCalledWith('/list/movies')
    expect(push).toHaveBeenCalledTimes(1)
  })

  it('Should applies active class to current route link', async () => {
    await router.push('/list/movies')
    await wrapper.vm.$nextTick()

    const movieLink = wrapper.findAll('nav a')[1]
    expect(movieLink.classes()).toContain('router-link-exact-active')
  })

  it('Should all navigation links have correct "to" props', () => {
    const links = wrapper.findAll('nav a')
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/list/movies')
    expect(links[2].attributes('href')).toBe('/list/series')
  })
})
