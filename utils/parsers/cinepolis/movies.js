/* eslint no-shadow: 0 */

import dayjs from 'dayjs';
import fetch from 'node-fetch';
import titleize from 'titleize';
import camelcaseKeys from 'camelcase-keys';

// Lib
import { createUniqueId } from '../../lib/movies';

const versions = {
  CAST: 'Castellano',
  SUBT: 'Subtitulada',
};

const getCinepolisMoviesAndShows = async (movies) => {
  // Get movies basic info
  const parsedMovies = movies.map(({ id, slug, titleTranslated, posterUrl }) => ({
    id,
    slug,
    poster: posterUrl,
    title: titleTranslated,
  }));

  // Add inCinemas key
  const moviesWithCinemasIds = await Promise.all(
    parsedMovies.map(async (movie) => {
      const response = await fetch(`https://www.cinepolis.com.ar/api/movies/${movie.id}/aggregations`);
      const { complex } = await response.json();

      return { ...movie, id: createUniqueId(movie.title), inCinemas: complex.map(String) };
    }),
  );

  // Get an array of all dates for all movies
  const moviesWithDates = await Promise.all(
    parsedMovies.map(async (movie) => {
      const response = await fetch(`https://www.cinepolis.com.ar/api/movies/${movie.id}/aggregations`);
      const { dates } = await response.json();

      return dates.map((date) => ({ id: movie.id, uniqueId: createUniqueId(movie.title), date }));
    }),
  ).then((dates) => dates.flat());

  // Get all shows for all movies and their dates
  const parsedShows = await Promise.all(
    moviesWithDates.map(async (movie) => {
      const { id, uniqueId, date } = movie;

      const response = await fetch(`https://www.cinepolis.com.ar/api/movies/${id}/showtimes?dates=${date}`);
      const { data } = await response.json();

      const moviesByCinemas = camelcaseKeys(data, { deep: true });

      const parsedShows = moviesByCinemas.map((movieByCinemas) => {
        return movieByCinemas.types.map((type) => {
          return type.options.map((option) => {
            const { version, format, showtimes } = option;

            return showtimes.map((show) => {
              const [date, time] = show.startsAt.split(' ');
              const [cinemaCode, sessionId] = show.externalId.split('-');

              const seats = {
                totalSeats: show.seats,
                availableSeats: show.seatsAvailable,
              };

              return {
                id: show.showtimeId,
                time: time.slice(0, 5),
                link: `https://tickets.cinepolis.com.ar/ticketing/visSelectTickets.aspx?cinemacode=${cinemaCode}&txtSessionId=${sessionId}`,
                format,
                version: versions[version],
                cinemaId: String(show.complexId),
                date: titleize(dayjs(date).format('dddd D [de] MMMM')),
                seats,
              };
            });
          });
        });
      });

      return [uniqueId, parsedShows.flat(3)];
    }),
  );

  const shows = parsedShows.reduce((acc, show) => {
    const [uniqueId, allShows] = show;
    return { ...acc, [uniqueId]: [...(acc[uniqueId] || []), ...allShows] };
  }, {});

  return { movies: moviesWithCinemasIds, shows };
};

export default getCinepolisMoviesAndShows;
