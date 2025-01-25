import type { MovieInterface } from '@/interfaces/MovieInterface'

export interface MovieDTO {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: MovieInterface[]
  total_pages: number
  total_results: number
}
