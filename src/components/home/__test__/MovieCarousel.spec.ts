import type { ComponentPublicInstance } from 'vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'
import mockMovies from '../../../mocks/movies.mock'

// Components
import MovieCarousel from '../MovieCarousel.vue'

// Services
import MoviesService from '../../../services/MoviesService'
import type { ServiceObject } from '../../../services/BaseService'

// DTO
import type { MovieDTO } from '../../../dtos/MovieDTO'

// Interfaces
import type { MovieCarouselStateInterface } from '../../../interfaces/MovieCarouselStateInterface'

interface MovieCarouselInstance extends ComponentPublicInstance {
  state: MovieCarouselStateInterface
  isLeftVisible: boolean
}

// Variables and constants
let wrapper: VueWrapper

let vm: MovieCarouselInstance

describe('MovieCarousel', () => {
  beforeEach(() => {
    const mockServiceResponse: ServiceObject<MovieDTO> = [Promise.resolve(mockMovies), null]
    vi.spyOn(MoviesService, 'getNowPlaying').mockReturnValue(mockServiceResponse)
    vi.spyOn(MoviesService, 'getPopular').mockReturnValue(mockServiceResponse)
    vi.spyOn(MoviesService, 'getUpcoming').mockReturnValue(mockServiceResponse)

    wrapper = mount(MovieCarousel, {
      props: {
        title: 'Now Playing',
        endpoint: 'nowPlaying',
        infinityScroll: true,
      },
      global: {
        plugins: [router],
        directives: {
          'lazy-container': {},
        },
      },
    })

    vm = wrapper.vm as MovieCarouselInstance
  })

  it('Should render the carousel title correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Now Playing')
  })

  it('Should display loading state initially', () => {
    const loadingElements = wrapper.findAll('.animate-pulse')
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it('Should render movie cards after data is loaded', async () => {
    // Wait for the promise to resolve
    await wrapper.vm.$nextTick()
    // Wait for the DOM to update
    await wrapper.vm.$nextTick()

    const movieCards = wrapper.findAllComponents({ name: 'MovieCard' })
    expect(movieCards.length).toBe(2)
  })

  it('Should show navigation buttons', async () => {
    await wrapper.vm.$nextTick()
    vm.isLeftVisible = true
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('Should handle scroll navigation', async () => {
    await wrapper.vm.$nextTick()
    vm.isLeftVisible = true
    await wrapper.vm.$nextTick()

    // Mock da função scrollTo
    Element.prototype.scrollTo = vi.fn()

    const buttons = wrapper.findAll('button')
    const nextButton = buttons[1]
    await nextButton.trigger('click')

    expect(vm.isLeftVisible).toBe(true)
    expect(Element.prototype.scrollTo).toHaveBeenCalled()
  })

  it('Should load more movies on scroll when infinity scroll is enabled', async () => {
    vi.clearAllMocks()
    const containerDiv = wrapper.find('.overflow-y-auto')
    await containerDiv.trigger('scroll')
    expect(MoviesService.getNowPlaying).toHaveBeenCalledTimes(1)
  })

  it('Should show error state and retry button when API fails', async () => {
    const errorMockResponse: ServiceObject<MovieDTO> = [
      Promise.resolve({ ...mockMovies, error: true }),
      null,
    ]

    vi.spyOn(MoviesService, 'getNowPlaying').mockReturnValue(errorMockResponse)

    await wrapper.vm.$nextTick()
    const vm = wrapper.vm as MovieCarouselInstance
    vm.state.error = true
    await wrapper.vm.$nextTick()

    const errorMessage = wrapper.find('.text-red-600')
    const retryButton = wrapper.find('button')

    expect(errorMessage.exists()).toBe(true)
    expect(retryButton.text()).toBe('Tentar novamente')
  })
})
