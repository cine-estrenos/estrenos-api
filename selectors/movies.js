const getMovieById = (movies, movieId) => movies.find(({ id }) => id === movieId)

module.exports = { getMovieById }
