import type { CreditsInterface } from '@/interfaces/CreditsInterface'
import { Get } from './BaseService'
import type { MovieInterface } from '@/interfaces/MovieInterface'

const MovieService = {
  getDetails: (param: { id: number | string | string[] }, query?: { language: string }) => {
    return Get<MovieInterface>(`/movie/${param.id}`, query)
  },
  getCredits: (param: { id: number | string | string[] }, query?: { language: string }) => {
    return Get<CreditsInterface>(`/movie/${param.id}/credits`, query)
  },
}

export default MovieService
