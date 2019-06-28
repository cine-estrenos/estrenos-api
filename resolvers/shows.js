const client = require("../client");

const {
  getShowsByMovieId,
  getShowsByMovieIdAndCinemaId,
} = require("../selectors/shows");

exports.getShowsByMovieId = async movieId => {
  const movies = await client.redis.get("movies");
  const moviesParsed = JSON.parse(movies);

  return getShowsByMovieId(moviesParsed, movieId);
};

exports.getShowsByMovieIdAndCinemaId = async (movieId, cinemaId) => {
  const movies = await client.redis.get("movies");
  const moviesParsed = JSON.parse(movies);

  return getShowsByMovieIdAndCinemaId(moviesParsed, movieId, cinemaId);
};
