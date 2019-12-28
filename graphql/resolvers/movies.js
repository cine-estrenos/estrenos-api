import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: async (_, { limit }) => {
      const data = await getMoviesResolver();
      return limit ? data.slice(0, limit) : data;
    },
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
