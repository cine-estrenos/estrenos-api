const { getMovies, getMovieById } = require('../../resolvers/movies');

module.exports = {
  Query: {
    movies: getMovies,
    movie: (_, args) => getMovieById(args.id),
  },
};
