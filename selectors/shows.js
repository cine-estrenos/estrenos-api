const getShowsByMovieId = (allShows, movieId) => {
  const shows = allShows[movieId];
  if (!shows) return null;

  return shows;
};

const getShowsByMovieIdAndCinemaId = (allShows, movieId, cinemaId) => {
  const showsPerMovie = getShowsByMovieId(allShows, movieId);
  if (!showsPerMovie) return null;

  const showsPerCinema = Object.values(showsPerMovie).filter((shows) => shows.cinemaId === cinemaId);
  return showsPerCinema;
};

export { getShowsByMovieId, getShowsByMovieIdAndCinemaId };
