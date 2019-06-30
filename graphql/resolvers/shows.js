const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('../../resolvers/shows');

module.exports = {
  Query: {
    shows: (_, { movieId, cinemaId }) =>
      cinemaId ? getShowsByMovieIdAndCinemaId(movieId, cinemaId) : getShowsByMovieId(movieId),
  },
};
