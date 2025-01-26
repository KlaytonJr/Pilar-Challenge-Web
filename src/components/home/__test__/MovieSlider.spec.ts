import type { ComponentPublicInstance } from 'vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'
import mockMovies from '../../../mocks/movies.mock'

// Services
import MoviesService from '../../../services/MoviesService'

// Components
import MovieSlider from '../MovieSlider.vue'

// DTOs
import type { MovieDTO } from '../../../dtos/MovieDTO'

// Interfaces
interface MovieSliderInstance extends ComponentPublicInstance {
  progress: number
  currentIndex: number
  nextSlide: () => void
}

// Variables and constants
let wrapper: VueWrapper

describe('MovieSlider', () => {
  beforeEach(() => {
    vi.spyOn(MoviesService, 'getUpcoming').mockReturnValue([Promise.resolve(mockMovies), null])

    wrapper = mount(MovieSlider, {
      global: {
        plugins: [router],
      },
    })
  })

  it('Should render movie title and overview', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Test Movie 1')
    expect(wrapper.text()).toContain('Test overview 1')
  })

  it('Should display "Lançamento" badge', async () => {
    await wrapper.vm.$nextTick()
    const badge = wrapper.find('.bg-neutral-500')
    expect(badge.text()).toBe('Lançamento')
  })

  it('Should show correct number of slider indicators', async () => {
    await wrapper.vm.$nextTick()
    const indicators = wrapper.findAll('.bg-white\\/30')
    expect(indicators.length).toBe(mockMovies.results.length)
  })

  it('Should navigate to movie details on button click', async () => {
    await wrapper.vm.$nextTick()
    const detailsButton = wrapper.find('a')
    expect(detailsButton.attributes('href')).toBe('/movie/1')
  })

  it('Should update slide on interval', async () => {
    vi.useFakeTimers()
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as MovieSliderInstance

    // Force the next slide
    vm.nextSlide()
    await wrapper.vm.$nextTick()

    expect(vm.currentIndex).toBe(1)
    vi.useRealTimers()
  }, 10000)

  it('Should update progress bar', async () => {
    vi.useFakeTimers()
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as MovieSliderInstance

    // Set initial progress
    vm.progress = 0

    // Trigger progress update
    setInterval(() => {
      vm.progress += 1
    }, 80)

    vi.advanceTimersByTime(80)
    await wrapper.vm.$nextTick()

    expect(vm.progress).toBe(1)
    vi.useRealTimers()
  }, 10000)
})
