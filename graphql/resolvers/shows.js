const {
  getShowsByMovieId,
  getShowsByMovieIdAndCinemaId,
} = require("../../resolvers/shows");

module.exports = {
  Query: {
    shows: (_, args) =>
      args.cinemaId
        ? getShowsByMovieIdAndCinemaId(args.movieId, args.cinemaId)
        : getShowsByMovieId(args.movieId),
  },
};
