import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: async (_, { limit, cinemaId }) => {
      const data = await getMoviesResolver();

      if (limit) return data.slice(0, limit);
      if (cinemaId) return data.filter(({ inCinemas }) => inCinemas.includes(cinemaId));

      return data;
    },
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
