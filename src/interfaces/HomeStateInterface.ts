import type { MovieDTO } from '@/dtos/MovieDTO'

export interface HomeStateInterface {
  playingNow: MovieDTO | undefined
  popular: MovieDTO | undefined
  upcoming: MovieDTO | undefined
}
