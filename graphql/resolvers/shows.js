import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from '../../resolvers/shows';

export default {
  Query: {
    shows: (_, { movieId, cinemaId }) =>
      cinemaId ? getShowsByMovieIdAndCinemaIdResolver(movieId, cinemaId) : getShowsByMovieIdResolver(movieId),
  },
};
