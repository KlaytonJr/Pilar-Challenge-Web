import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'

// Components
import SearchInput from '../SearchInput.vue'

// Variables and constants
let wrapper: VueWrapper

describe('SearchInput', () => {
  beforeEach(() => {
    wrapper = mount(SearchInput, {
      global: {
        plugins: [router],
      },
    })
  })

  it('Should render input field correctly', () => {
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Buscar por filme ou série')
  })

  it('Should updates searchQuery on input', async () => {
    const input = wrapper.find('input')
    await input.setValue('Frozen')
    expect(input.element.value).toBe('Frozen')
  })

  it('Should does NOT trigger search with empty query', async () => {
    const push = vi.spyOn(router, 'push')
    const input = wrapper.find('input')

    await input.setValue(' ')
    await input.trigger('keyup.enter')

    expect(push).not.toHaveBeenCalled()
  })

  it('Should trigger search on enter key', async () => {
    const push = vi.spyOn(router, 'push')
    const input = wrapper.find('input')

    await input.setValue('Frozen')
    await input.trigger('keyup.enter')

    expect(push).toHaveBeenCalledWith({
      name: 'search',
      query: { q: 'Frozen' },
    })
  })

  it('Should trigger search on icon click', async () => {
    const push = vi.spyOn(router, 'push')
    const input = wrapper.find('input')
    const searchIcon = wrapper.find('#search-icon')

    await input.setValue('Frozen')
    await searchIcon.trigger('click')

    expect(push).toHaveBeenCalledWith({
      name: 'search',
      query: { q: 'Frozen' },
    })
  })
})
