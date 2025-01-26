import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieService from '../MovieService'
import { Get } from '../BaseService'

vi.mock('../BaseService', () => ({
  Get: vi.fn(),
}))

describe('MovieService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should get movie details with correct parameters', () => {
    const mockParams = { id: 123 }
    const mockQuery = { language: 'pt-BR' }

    MovieService.getDetails(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/123', mockQuery)
  })

  it('Should get movie credits with correct parameters', () => {
    const mockParams = { id: 456 }
    const mockQuery = { language: 'pt-BR' }

    MovieService.getCredits(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/456/credits', mockQuery)
  })

  it('Should handle string id parameter', () => {
    const mockParams = { id: '789' }
    MovieService.getDetails(mockParams)
    expect(Get).toHaveBeenCalledWith('/movie/789', undefined)
  })

  it('Should handle query parameters correctly', () => {
    const mockParams = { id: 123 }
    const mockQuery = { language: 'en-US' }

    MovieService.getDetails(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/movie/123', { language: 'en-US' })
  })
})
