const getMovieById = (movies, movieId) => movies.find(({ id }) => id === movieId)

const getShowsByMovieId = (movies, movieId) => {
  const movie = getMovieById(movies, movieId)
  if (!movie) return undefined

  return movie.shows
}

getShowsByMovieIdAndCinemaId = (movies, movieId, cinemaId) => {
  const showsPerMovie = getShowsByMovieId(movies, movieId)
  if (!showsPerMovie) return undefined

  const showsPerCinema = showsPerMovie.find(({ cinemaId: id }) => id === cinemaId)
  return showsPerCinema
}

module.exports = { getMovieById, getShowsByMovieId, getShowsByMovieIdAndCinemaId }
