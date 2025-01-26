const mockMovies = {
  dates: {
    maximum: '2024-03-20',
    minimum: '2024-02-20',
  },
  results: [
    {
      id: 1,
      title: 'Test Movie 1',
      poster_path: '/test1.jpg',
      backdrop_path: '/backdrop1.jpg',
      vote_average: 8.5,
      release_date: '2024-01-01',
      overview: 'Test overview 1',
    },
    {
      id: 2,
      title: 'Test Movie 2',
      poster_path: '/test2.jpg',
      backdrop_path: '/backdrop2.jpg',
      vote_average: 7.5,
      release_date: '2024-02-01',
      overview: 'Test overview 2',
    },
  ],
  page: 1,
  total_pages: 3,
  total_results: 40,
}

export default mockMovies
