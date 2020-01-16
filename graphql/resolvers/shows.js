import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from '../../resolvers/shows';

export default {
  Query: {
    shows: async (_, { movieId, cinemaId }) => {
      if (movieId && cinemaId) {
        const showsInCinema = await getShowsByMovieIdAndCinemaIdResolver(movieId, cinemaId);
        return showsInCinema;
      }

      if (movieId) {
        const showsByMovie = await getShowsByMovieIdResolver(movieId);
        return showsByMovie;
      }

      return [];
    },
  },
};
