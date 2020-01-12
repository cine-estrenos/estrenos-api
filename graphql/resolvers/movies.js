import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: async (_, { limit, name, cinemaId }) => {
      let data = await getMoviesResolver();

      if (name) data = data.filter(({ title }) => title.includes(name));
      if (cinemaId) data = data.filter(({ inCinemas }) => inCinemas.includes(cinemaId));

      return data.slice(0, limit);
    },
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
