import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

// Components
import VFilters from '../VFilters.vue'

// Mocks
import router from '../../../mocks/router.mock'
import mockGenres from '../../../mocks/genres.mock'

describe('VFilters', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    await router.push({
      query: { sortBy: 'popularity.desc', genre: '' },
    })
    await router.isReady()

    wrapper = mount(VFilters, {
      props: {
        genres: mockGenres.genres,
      },
      global: {
        plugins: [router],
      },
    })
  })

  it('Should render sort by dropdown with correct options', () => {
    const select = wrapper.find('select')
    const options = wrapper.findAll('.sortby-option')

    expect(select.exists()).toBe(true)
    expect(options.length).toBe(3)
    expect(options[0].text()).toBe('Popularidade (decrescente)')
  })

  it('Should render genres dropdown with correct options', () => {
    const options = wrapper.findAll('.genre-option')

    expect(options.length).toBe(mockGenres.genres.length + 1)
    expect(options[0].text()).toBe('Todos os Gêneros')
  })

  it('Should update URL when sort option changes', async () => {
    const push = vi.spyOn(router, 'push')
    const select = wrapper.find('#sortby-select')
    await select.setValue('release_date.desc')

    expect(push).toHaveBeenCalledWith({
      query: { sortBy: 'release_date.desc', genre: '' },
    })
  })

  it('Should update URL when genre option changes', async () => {
    const push = vi.spyOn(router, 'push')
    const genreSelect = wrapper.find('#genre-select')
    await genreSelect.setValue('2')

    expect(push).toHaveBeenCalledWith({
      query: { sortBy: 'popularity.desc', genre: 2 },
    })
  })

  it('Should initialize with query params values', async () => {
    await router.push({
      query: {
        sortBy: 'vote_average.desc',
        genre: '2',
      },
    })

    const wrapper = mount(VFilters, {
      props: { genres: mockGenres.genres },
      global: { plugins: [router] },
    })

    const sortSelect = wrapper.find('select')
    const genreSelect = wrapper.findAll('select')[1]

    expect(sortSelect.element.value).toBe('vote_average.desc')
    expect(genreSelect.element.value).toBe('2')
  })
})
