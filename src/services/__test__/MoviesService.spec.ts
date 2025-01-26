import { describe, it, expect, vi, beforeEach } from 'vitest'
import MoviesService from '../MoviesService'
import { Get } from '../BaseService'
import type { MoviesQuery } from '../../query/MoviesQuery'

vi.mock('../BaseService', () => ({
  Get: vi.fn(),
}))

describe('MoviesService', () => {
  const mockQuery: MoviesQuery = {
    language: 'pt-BR',
    page: 1,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should get now playing movies with correct parameters', () => {
    MoviesService.getNowPlaying(mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/now_playing', mockQuery)
  })

  it('Should get popular movies with correct parameters', () => {
    MoviesService.getPopular(mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/popular', mockQuery)
  })

  it('Should get upcoming movies with correct parameters', () => {
    MoviesService.getUpcoming(mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/upcoming', mockQuery)
  })

  it('Should handle additional query parameters', () => {
    const extendedQuery: MoviesQuery = {
      ...mockQuery,
      region: 'BR',
    }

    MoviesService.getPopular(extendedQuery)
    expect(Get).toHaveBeenCalledWith('/movie/popular', extendedQuery)
  })
})
