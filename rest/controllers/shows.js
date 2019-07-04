import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from '../../resolvers/shows';

const getShowsByMovieIdController = async (request, reply) => {
  const { movieId } = request.params;
  const shows = await getShowsByMovieIdResolver(movieId);

  return shows ? reply.send(shows) : reply.code(404).send('No shows found');
};

const getShowsByMovieIdAndCinemaIdController = async (request, reply) => {
  const { movieId, cinemaId } = request.params;
  const shows = await getShowsByMovieIdAndCinemaIdResolver(movieId, cinemaId);

  return shows ? reply.send(shows) : reply.code(404).send('No shows found');
};

export { getShowsByMovieIdController, getShowsByMovieIdAndCinemaIdController };
