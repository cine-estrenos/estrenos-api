import { getMoviesResolver, getMovieByIdResolver } from '../../resolvers/movies';

export default {
  Query: {
    movies: async (_, { limit }) => {
      const data = await getMoviesResolver();
      const moviesSortedByMostVoted = data.sort((a, b) => b.votes - a.votes);

      return limit ? moviesSortedByMostVoted.slice(0, limit) : moviesSortedByMostVoted;
    },
    movie: (_, { id }) => getMovieByIdResolver(id),
  },
};
