import getMovieById from './movies';

const getShowsByMovieId = (movies, movieId) => {
  const movie = getMovieById(movies, movieId);
  if (!movie) return null;

  return movie.shows;
};

const getShowsByMovieIdAndCinemaId = (movies, movieId, cinemaId) => {
  const showsPerMovie = getShowsByMovieId(movies, movieId);
  if (!showsPerMovie) return null;

  const showsPerCinema = showsPerMovie.filter(({ cinemaId: id }) => id === cinemaId);
  return showsPerCinema;
};

export { getShowsByMovieId, getShowsByMovieIdAndCinemaId };
