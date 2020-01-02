import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: async (_, { limit, cinemaId }) => {
      const data = await getMoviesResolver();
      const moviesSortedByMostVoted = data.sort((a, b) => b.votes - a.votes);

      if (limit) return moviesSortedByMostVoted.slice(0, limit);
      if (cinemaId) return moviesSortedByMostVoted.filter(({ inCinemas }) => inCinemas.includes(cinemaId));

      return moviesSortedByMostVoted;
    },
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
