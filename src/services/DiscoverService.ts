import { Get } from './BaseService'
import type DiscoverQuery from '../query/DiscoverQuery'

const DiscoverService = {
  getMovies: (params?: DiscoverQuery) => {
    let paramsString = ''
    if (params) {
      paramsString = Object.keys(params)
        .map((key) => `${key}=${params[key as keyof DiscoverQuery]}`)
        .join('&')
    }

    return Get(`/discover/movie?${paramsString}`)
  },
  getMoviesGenres: () => {
    return Get(`/genre/movie/list`)
  },
  getSeries: (params?: DiscoverQuery) => {
    let paramsString = ''
    if (params) {
      paramsString = Object.keys(params)
        .map((key) => `${key}=${params[key as keyof DiscoverQuery]}`)
        .join('&')
    }

    return Get(`/discover/tv?${paramsString}`)
  },
  getSeriesGenres: () => {
    return Get(`/genre/tv/list`)
  },
}

export default DiscoverService
