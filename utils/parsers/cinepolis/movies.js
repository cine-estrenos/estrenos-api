/* eslint no-shadow: 0 */

import dayjs from 'dayjs';
import fetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';

// Lib
import emojifier from '../../lib/emojis';
import { createUniqueId } from '../../lib/movies';

const versions = {
  CAST: 'Castellano',
  SUBT: 'Subtitulada',
};

const getCinepolisMoviesAndShows = async (movies) => {
  // Get upcoming releases (to use genres key)
  const response = await fetch('https://www.cinepolis.com.ar/api/upcoming-releases?limit=100');
  const upcomingReleases = await response.json();

  // Get movies basic info
  const parsedMovies = movies.map(({ id, slug, titleTranslated, posterUrl }) => {
    const release = upcomingReleases.find((upcomingRelease) => upcomingRelease.id === id);
    const genres = release ? release.genres.map(({ name }) => ({ value: name, emoji: emojifier(name) })) : [];

    return {
      id,
      slug,
      genres,
      poster: posterUrl,
      title: titleTranslated,
      trailer: { href: '', type: '' },
    };
  });

  // Add cast
  const moviesWithCast = await Promise.all(
    parsedMovies.map(async (movie) => {
      const response = await fetch(`https://www.cinepolis.com.ar/api/movies/${movie.id}`);
      const data = await response.json();

      const parsedData = camelcaseKeys(data, { deep: true });
      const { cast: actors, director, overview: description, parentalGuide, runtime, tmdbId } = parsedData;

      const cast = {
        actors: (actors || '').split(', '),
        directors: (director || '').split(', '),
      };
      const minAge = parentalGuide || '';
      const length = runtime || 0;

      return { ...movie, cast, description, minAge, length, tmdbId };
    }),
  );

  // Add inCinemas key
  const moviesWithCinemasIds = await Promise.all(
    moviesWithCast.map(async (movie) => {
      const response = await fetch(`https://www.cinepolis.com.ar/api/movies/${movie.id}/aggregations`);
      const { complex, formats: tags } = await response.json();

      return { ...movie, tags, id: createUniqueId(movie.title), inCinemas: complex.map(String) };
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
                total: show.seats,
                available: show.seatsAvailable,
              };

              return {
                seats,
                format,
                id: show.showtimeId,
                time: time.slice(0, 5),
                version: versions[version],
                cinemaId: String(show.complexId),
                date: dayjs(date).format('YYYY-MM-DD'),
                link: `https://tickets.cinepolis.com.ar/ticketing/visSelectTickets.aspx?cinemacode=${cinemaCode}&txtSessionId=${sessionId}`,
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
