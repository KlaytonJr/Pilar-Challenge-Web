import { describe, it, vi, expect, beforeEach } from 'vitest'
import $http from '../../plugins/http'
import { Get } from '../BaseService'
import { useToast } from '../../plugins/toast'

vi.mock('../../plugins/http', () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock('../../plugins/toast', () => ({
  useToast: vi.fn(() => ({
    showError: vi.fn(),
  })),
}))

describe('Get', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked($http.get).mockResolvedValue({
      data: 'mocked response',
    })
  })

  it('should make an HTTP GET request with correct parameters', async () => {
    const mockResponse = { data: { success: true } }
    vi.mocked($http.get).mockResolvedValue(mockResponse)

    const [request] = Get('test-url', { key: 'value' })
    await request

    expect($http.get).toHaveBeenCalledWith('test-url', {
      params: { key: 'value' },
    })
  })

  it('should resolve with the response data on success', async () => {
    const mockResponse = { data: { success: true } }
    vi.mocked($http.get).mockResolvedValue(mockResponse)

    const [request] = Get('test-url')
    const result = await request

    expect(result).toEqual(mockResponse.data)
  })

  it('should call showError and reject on error', async () => {
    const mockError = new Error('Request failed')

    vi.mocked($http.get).mockRejectedValue(mockError)

    const showErrorMock = vi.fn()
    const toastMock = { showError: showErrorMock }

    const [request] = Get('test-url', undefined, toastMock)

    await expect(request).rejects.toThrow(mockError)

    expect(showErrorMock).toHaveBeenCalledTimes(1)
    expect(showErrorMock).toHaveBeenCalledWith('Ocorreu alguma falha ao executar a requisição')
  })

  it('should validate useToast mock', () => {
    const { showError } = useToast()
    showError('Test error')
    expect(showError).toHaveBeenCalledWith('Test error')
  })
})
