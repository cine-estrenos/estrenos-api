// Resolvers
import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

const getMoviesController = getMoviesResolver;

const getMovieByIdController = async (request, reply) => {
  const { movieId } = request.params;
  const movie = await getMovieByIdResolver(movieId);

  return movie ? reply.send(movie) : reply.code(404).send('No movie found');
};

export { getMoviesController, getMovieByIdController };
