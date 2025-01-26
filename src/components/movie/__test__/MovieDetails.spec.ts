import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'
import mockCredits from '../../../mocks/credits.mock'
import mockMovie from '../../../mocks/movie.mock'

// Components
import MovieDetails from '../MovieDetails.vue'

// Services
import MovieService from '../../../services/MovieService'
import SerieService from '../../../services/SerieService'

describe('MovieDetails', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    // Mock service methods to return promises directly
    vi.spyOn(MovieService, 'getDetails').mockReturnValue([Promise.resolve(mockMovie), null])
    vi.spyOn(MovieService, 'getCredits').mockReturnValue([Promise.resolve(mockCredits), null])

    vi.spyOn(SerieService, 'getDetails').mockReturnValue([Promise.resolve(mockMovie), null])
    vi.spyOn(SerieService, 'getCredits').mockReturnValue([Promise.resolve(mockCredits), null])

    router.push('/movie/1')
    await router.isReady()

    wrapper = mount(MovieDetails, {
      global: {
        plugins: [router],
        directives: {
          'lazy-container': {},
        },
      },
    })

    // Wait for initial data fetch
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  it('Should render movie title', () => {
    expect(wrapper.find('h1').text()).toBe('Test Movie')
  })

  it('Should display movie rating', () => {
    expect(wrapper.find('#vote_average').text()).toContain('8.5')
  })

  it('Should show movie release date', () => {
    expect(wrapper.find('#release_date').text()).toContain('18/12/2024')
  })

  it('Should display movie genres', () => {
    const genres = wrapper.findAll('p')
    expect(genres.some((g) => g.text().includes('Action'))).toBe(true)
    expect(genres.some((g) => g.text().includes('Drama'))).toBe(true)
  })

  it('Should render movie overview', () => {
    expect(wrapper.text()).toContain('Test movie overview')
  })

  it('Should display cast members', () => {
    const castMembers = wrapper.findAll('.cast-member')
    expect(castMembers[0].text()).toBe('Actor 1')
    expect(castMembers[1].text()).toBe('Actor 2')
  })

  it('Should handle image loading errors', async () => {
    const img = wrapper.find('img')
    await img.trigger('error')
    expect(img.attributes('src')).toContain('unknown-person.jpg')
  })

  it('Should use correct service based on route', async () => {
    await router.push('/serie/1')
    await router.isReady()

    wrapper = mount(MovieDetails, {
      global: {
        plugins: [router],
        directives: {
          'lazy-container': {},
        },
      },
    })

    await wrapper.vm.$nextTick()
    expect(SerieService.getDetails).toHaveBeenCalled()
  })
})
