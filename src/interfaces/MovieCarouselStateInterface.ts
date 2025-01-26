import type { MovieDTO } from '@/dtos/MovieDTO'

export interface MovieCarouselStateInterface {
  movies: MovieDTO | undefined
  loading: boolean
  error: boolean
}
