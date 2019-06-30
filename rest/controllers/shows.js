const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('../../resolvers/shows');

exports.getShowsByMovieId = async (request, reply) => {
  const shows = await getShowsByMovieId(request.params.movieId);

  return shows ? reply.send(shows) : reply.code(404).send('No shows found');
};

exports.getShowsByMovieIdAndCinemaId = async (request, reply) => {
  const shows = await getShowsByMovieIdAndCinemaId(request.params.movieId, request.params.cinemaId);

  return shows ? reply.send(shows) : reply.code(404).send('No shows found');
};
