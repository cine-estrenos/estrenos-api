import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: getMoviesResolver,
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
