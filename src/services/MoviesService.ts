import type { MovieDTO } from '@/dtos/MovieDTO'
import { Get } from './BaseService'
import type { MoviesQuery } from '@/query/MoviesQuery'

const MoviesService = {
  getNowPlaying: (query: MoviesQuery) => {
    return Get<MovieDTO>('/movie/now_playing', query)
  },
  getPopular: (query: MoviesQuery) => {
    return Get<MovieDTO>('/movie/popular', query)
  },
  getUpcoming: (query: MoviesQuery) => {
    return Get<MovieDTO>('/movie/upcoming', query)
  },
}

export default MoviesService
