import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from '../../resolvers/shows';

export default {
  Query: {
    shows: async (_, { movieId, cinemaId }) => {
      try {
        if (movieId && cinemaId) {
          const showsInCinema = await getShowsByMovieIdAndCinemaIdResolver(movieId, cinemaId);
          return showsInCinema;
        }

        if (movieId) {
          const showsByMovie = await getShowsByMovieIdResolver(movieId);
          return showsByMovie;
        }

        return [];
      } catch (error) {
        console.log('Error on shows resolver', error); // eslint-disable-line no-console
        return [];
      }
    },
  },
};
