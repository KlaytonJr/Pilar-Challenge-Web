import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchService from '../SearchService'
import { Get } from '../BaseService'
import type DiscoverQuery from '../../query/DiscoverQuery'

vi.mock('../BaseService', () => ({
  Get: vi.fn(),
}))

describe('SearchService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should perform search with correct parameters', () => {
    const mockQuery: DiscoverQuery = {
      query: 'test movie',
      language: 'pt-BR',
      page: 1,
      adult: false,
    }

    SearchService.getSearch(mockQuery)
    expect(Get).toHaveBeenCalledWith('/search/multi', mockQuery)
  })

  it('Should handle search without query parameters', () => {
    SearchService.getSearch()
    expect(Get).toHaveBeenCalledWith('/search/multi', undefined)
  })

  it('Should handle empty query object', () => {
    SearchService.getSearch({})
    expect(Get).toHaveBeenCalledWith('/search/multi', {})
  })
})
