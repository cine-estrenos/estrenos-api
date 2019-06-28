const {getMovieById} = require("./movies");

const getShowsByMovieId = (movies, movieId) => {
  const movie = getMovieById(movies, movieId);
  if (!movie) return null;

  return movie.shows;
};

const getShowsByMovieIdAndCinemaId = (movies, movieId, cinemaId) => {
  const showsPerMovie = getShowsByMovieId(movies, movieId);
  if (!showsPerMovie) return null;

  const showsPerCinema = showsPerMovie
    .filter(({cinemaWithShows}) => cinemaWithShows.hasOwnProperty(cinemaId))
    .map(shows => {
      const {cinemaWithShows} = shows;
      const cinemaInShows = cinemaWithShows[cinemaId];

      return {...shows, cinemaWithShows: {[cinemaId]: cinemaInShows}};
    });

  return showsPerCinema;
};

module.exports = {getShowsByMovieId, getShowsByMovieIdAndCinemaId};
