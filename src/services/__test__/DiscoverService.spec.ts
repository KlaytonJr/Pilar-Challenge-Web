import { describe, it, expect, vi, beforeEach } from 'vitest'
import DiscoverService from '../DiscoverService'
import { Get } from '../BaseService'

vi.mock('../BaseService', () => ({
  Get: vi.fn(),
}))

describe('DiscoverService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should get movies with correct parameters', () => {
    const mockParams = {
      language: 'pt-BR',
      page: 1,
      sort_by: 'popularity.desc',
    }

    DiscoverService.getMovies(mockParams)

    const expectedUrl = `/discover/movie?language=pt-BR&page=1&sort_by=popularity.desc`
    expect(Get).toHaveBeenCalledWith(expectedUrl)
  })

  it('Should get movies genres', () => {
    DiscoverService.getMoviesGenres()
    expect(Get).toHaveBeenCalledWith('/genre/movie/list')
  })

  it('Should get series with correct parameters', () => {
    const mockParams = {
      language: 'pt-BR',
      page: 1,
      with_genres: '28',
    }

    DiscoverService.getSeries(mockParams)

    const expectedUrl = `/discover/tv?language=pt-BR&page=1&with_genres=28`
    expect(Get).toHaveBeenCalledWith(expectedUrl)
  })

  it('Should get series genres', () => {
    DiscoverService.getSeriesGenres()
    expect(Get).toHaveBeenCalledWith('/genre/tv/list')
  })

  it('Should handle empty parameters', () => {
    DiscoverService.getMovies()
    expect(Get).toHaveBeenCalledWith('/discover/movie?')
  })

  it('Should handle multiple parameters correctly', () => {
    const mockParams = {
      language: 'pt-BR',
      page: 1,
      sort_by: 'popularity.desc',
      with_genres: '28,12',
      include_adult: false,
    }

    DiscoverService.getMovies(mockParams)

    const expectedUrl = `/discover/movie?language=pt-BR&page=1&sort_by=popularity.desc&with_genres=28,12&include_adult=false`
    expect(Get).toHaveBeenCalledWith(expectedUrl)
  })
})
