import { describe, it, expect, vi, beforeEach } from 'vitest'
import SerieService from '../SerieService'
import { Get } from '../BaseService'

vi.mock('../BaseService', () => ({
  Get: vi.fn(),
}))

describe('SerieService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should get series details with correct parameters', () => {
    const mockParams = { id: 123 }
    const mockQuery = { language: 'pt-BR' }

    SerieService.getDetails(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/tv/123', mockQuery)
  })

  it('Should get series credits with correct parameters', () => {
    const mockParams = { id: 456 }
    const mockQuery = { language: 'pt-BR' }

    SerieService.getCredits(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/tv/456/credits', mockQuery)
  })

  it('Should handle string id parameter', () => {
    const mockParams = { id: '789' }
    SerieService.getDetails(mockParams)
    expect(Get).toHaveBeenCalledWith('/tv/789', undefined)
  })

  it('Should handle query parameters correctly', () => {
    const mockParams = { id: 123 }
    const mockQuery = { language: 'en-US' }

    SerieService.getDetails(mockParams, mockQuery)
    expect(Get).toHaveBeenCalledWith('/tv/123', { language: 'en-US' })
  })
})
