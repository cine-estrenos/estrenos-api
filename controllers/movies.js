const { getMovies, getMovieById } = require('../resolvers/movies')

exports.getMovies = getMovies;

exports.getMovieById = async (request, reply) => {
  const movie = await getMovieById(moviesParsed, request.params.movieId);

  return movie ? reply.send(movie) : reply.code(404).send('No movie found')
}
