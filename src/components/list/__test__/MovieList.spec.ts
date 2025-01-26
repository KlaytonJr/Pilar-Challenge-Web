import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

// Components
import MovieList from '../MovieList.vue'

// Services
import DiscoverService from '../../../services/DiscoverService'
import SearchService from '../../../services/SearchService'

// Mocks
import router from '../../../mocks/router.mock'
import mockMovies from '../../../mocks/movies.mock'
import mockGenres from '../../../mocks/genres.mock'

describe('MovieList', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    vi.spyOn(DiscoverService, 'getMovies').mockReturnValue([Promise.resolve(mockMovies), null])
    vi.spyOn(DiscoverService, 'getSeries').mockReturnValue([Promise.resolve(mockMovies), null])
    vi.spyOn(DiscoverService, 'getMoviesGenres').mockReturnValue([
      Promise.resolve(mockGenres),
      null,
    ])
    vi.spyOn(DiscoverService, 'getSeriesGenres').mockReturnValue([
      Promise.resolve(mockGenres),
      null,
    ])
    vi.spyOn(SearchService, 'getSearch').mockReturnValue([Promise.resolve(mockMovies), null])

    await router.push('/list/movies')
    await router.isReady()

    wrapper = mount(MovieList, {
      global: {
        plugins: [router],
        stubs: {
          MovieCard: true,
          VFilters: true,
          VPagination: true,
        },
      },
    })
  })

  it('Should render movie list with correct number of items', async () => {
    await wrapper.vm.$nextTick()
    const movieCards = wrapper.findAllComponents({ name: 'MovieCard' })
    expect(movieCards.length).toBe(mockMovies.results.length)
  })

  it('Should show loading state', async () => {
    const vm = wrapper.vm as any
    vm.loading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Carregando...')
  })

  it('Should fetch movies on mount', () => {
    expect(DiscoverService.getMovies).toHaveBeenCalled()
  })

  it('Should fetch series when on series route', async () => {
    await router.push('/list/series')
    await wrapper.vm.$nextTick()
    expect(DiscoverService.getSeries).toHaveBeenCalled()
  })

  it('Should update data when filters change', async () => {
    await router.push({
      query: {
        sortBy: 'vote_average.desc',
        genre: '1',
        page: '2',
      },
    })
    await wrapper.vm.$nextTick()

    expect(DiscoverService.getMovies).toHaveBeenCalledWith({
      language: 'pt-BR',
      page: 2,
      sort_by: 'vote_average.desc',
      with_genres: '1',
      include_adult: false,
      include_video: false,
    })
  })

  it('Should perform search when on search route', async () => {
    // Montar com rota inicial
    await router.push({
      name: 'search',
      query: { q: 'test' },
    })
    await router.isReady()

    // limpar chamadas de mock
    vi.clearAllMocks()

    // Montar componente com rota de pesquisa
    wrapper = mount(MovieList, {
      global: {
        plugins: [router],
        stubs: {
          MovieCard: true,
          VFilters: true,
          VPagination: true,
        },
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(SearchService.getSearch).toHaveBeenCalledWith({
      query: 'test',
      language: 'pt-BR',
      page: 1,
      adult: false,
    })
  })
})
