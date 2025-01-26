export default interface DiscoverQuery {
  query?: string
  language?: string
  page?: number
  sort_by?: string
  with_genres?: string
  include_adult?: boolean
  include_video?: boolean
  adult?: false
}
