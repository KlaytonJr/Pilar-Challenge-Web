import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

// Components
import VPagination from '../VPagination.vue'

// Mocks
import router from '../../../mocks/router.mock'

describe('VPagination', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    await router.push({
      query: { page: '1' },
    })
    await router.isReady()

    wrapper = mount(VPagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
      },
      global: {
        plugins: [router],
      },
    })
  })

  it('Should render pagination buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('Should display current page and total pages', () => {
    const pageInfo = wrapper.find('span')
    expect(pageInfo.text()).toBe('Página 1 de 10')
  })

  it('Should disable previous button on scroll init', () => {
    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('Should enable previous button when not on scroll start', async () => {
    await wrapper.setProps({ currentPage: 2 })
    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeUndefined()
  })

  it('Should disable next button on last page', async () => {
    await wrapper.setProps({ currentPage: 10 })
    const nextButton = wrapper.findAll('button')[1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('Should update URL when changing page', async () => {
    const push = vi.spyOn(router, 'push')
    const nextButton = wrapper.findAll('button')[1]
    await nextButton.trigger('click')
    await router.isReady()

    expect(push).toHaveBeenCalledWith({
      query: { page: 2 },
    })
  })

  it('Should navigate to previous page', async () => {
    await wrapper.setProps({ currentPage: 2 })
    const prevButton = wrapper.findAll('button')[0]
    await prevButton.trigger('click')
    await router.isReady()

    expect(router.currentRoute.value.query.page).toBe('1')
  })
})
