import type { MovieInterface } from '../interfaces/MovieInterface'

const mockMovie: MovieInterface = {
  id: 1,
  title: 'Test Movie',
  poster_path: 'test-path.jpg',
  vote_average: 8.5,
  release_date: '2024-12-19',
  overview: 'Test movie overview',
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ],
  adult: false,
  genre_ids: [1, 2],
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100,
  video: false,
  vote_count: 1000,
  backdrop_path: '',
}

export default mockMovie
