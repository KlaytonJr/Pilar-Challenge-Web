import { Get } from './BaseService'
import type { CreditsInterface } from '../interfaces/CreditsInterface'
import type { MovieInterface } from '../interfaces/MovieInterface'

const SerieService = {
  getDetails: (param: { id: number | string | string[] }, query?: { language: string }) => {
    return Get<MovieInterface>(`/tv/${param.id}`, query)
  },
  getCredits: (param: { id: number | string | string[] }, query?: { language: string }) => {
    return Get<CreditsInterface>(`/tv/${param.id}/credits`, query)
  },
}

export default SerieService
