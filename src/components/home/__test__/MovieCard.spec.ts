import { describe, it, expect, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Mocks
import router from '../../../mocks/router.mock'
import mockMovie from '../../../mocks/movie.mock'

// Components
import MovieCard from '../MovieCard.vue'

// Variables and constants
let wrapper: VueWrapper

describe('MovieCard', () => {
  beforeEach(() => {
    wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
      },
      global: {
        plugins: [router],
        directives: {
          'lazy-container': {},
        },
      },
    })
  })

  it('Should render movie title correctly', () => {
    expect(wrapper.find('#title').text()).toBe('Test Movie')
  })

  it('Should format and display vote average', () => {
    expect(wrapper.find('#rating').text()).toContain('8.5')
  })

  it('Should format and display release date', () => {
    expect(wrapper.find('#release-date').text()).toContain('Dec 2024')
  })

  it('Should construct correct image URL', () => {
    const img = wrapper.find('img')
    expect(img.attributes('data-src')).toBe(
      'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/test-path.jpg',
    )
  })

  it('Should use fallback image when image load fails', async () => {
    const img = wrapper.find('img')
    await img.trigger('error')
    expect(img.attributes('src')).toContain('unknown-person.jpg')
  })

  it('Should link to correct movie detail route', () => {
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/movie/1')
  })
})
