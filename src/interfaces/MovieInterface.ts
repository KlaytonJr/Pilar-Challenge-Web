import type { GenreInterface } from './GenreInterface'

export interface MovieInterface {
  adult: boolean
  backdrop_path: string
  genres?: GenreInterface[]
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
