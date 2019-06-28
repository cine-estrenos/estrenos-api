const client = require("../client");

const {getMovieById} = require("../selectors/movies");

exports.getMovies = async () => {
  const moviesWithoutShows = await client.redis.get("moviesWithoutShows");

  return JSON.parse(moviesWithoutShows);
};

exports.getMovieById = async id => {
  const movies = await client.redis.get("moviesWithoutShows");
  const moviesParsed = JSON.parse(movies);

  return getMovieById(moviesParsed, id);
};
