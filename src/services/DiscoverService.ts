import { Get } from './BaseService'

const DiscoverService = {
  getMovies: (params?: any) => {
    const paramsString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')

    return Get<any>(`/discover/movie?${paramsString}`)
  },
  getMoviesGenres: () => {
    return Get<any>(`/genre/movie/list`)
  },
  getSeries: (params?: any) => {
    const paramsString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')

    return Get<any>(`/discover/tv?${paramsString}`)
  },
  getSeriesGenres: () => {
    return Get<any>(`/genre/tv/list`)
  },
}

export default DiscoverService
