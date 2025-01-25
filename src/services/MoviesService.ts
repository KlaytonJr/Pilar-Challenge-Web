import type { MovieDTO } from '@/dtos/MovieDTO'
import { Get } from './BaseService'
import type { MovieQuery } from '@/query/MovieQuery'

const MoviesService = {
  getNowPlaying: (query: MovieQuery) => {
    return Get<MovieDTO>('/movie/now_playing', query)
  },
  getPopular: (query: MovieQuery) => {
    return Get<MovieDTO>('/movie/popular', query)
  },
  getUpcoming: (query: MovieQuery) => {
    return Get<MovieDTO>('/movie/upcoming', query)
  },
}

export default MoviesService
