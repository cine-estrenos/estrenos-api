/* eslint no-shadow: 0 */

import dayjs from 'dayjs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import titleize from 'titleize';

// Cinemas
import { getCinemaId, cinemas } from './cinemas';

// Lib
import emojifier from '../../lib/emojis';
import { parseCast, createUniqueId } from '../../lib/movies';

const showcaseCastTypes = { actor: 'Actor', director: 'Director' };

export const showcaseCinemas = cinemas;

export const scrapShowcaseMoviesAndShows = async (html) => {
  const $ = cheerio.load(html);
  const $movies = $('#cartelera_actual .boxfilm');

  /* Get Showcase movies */
  const movies = $movies
    .map((_, element) => {
      const $movie = $(element);

      const link = $movie
        .find('.comprar a')
        .attr('href')
        .trim();
      const poster = $movie.find('.afiche-pelicula img').attr('src');
      const tags = [
        titleize($movie.find('.estreno p').text()),
        titleize($movie.find('.estreno2 p').text()),
        $movie
          .find('.tresd p')
          .text()
          .toUpperCase(),
      ].filter(Boolean);

      return { link, poster, tags };
    })
    .get();

  /* Get all movies specific info: dates, and cinemas */
  const shows = {};

  const moviesData = await Promise.all(
    movies.map(async (movie) => {
      const { link, poster, tags } = movie;
      const res = await fetch(link);
      const data = await res.text();

      const $ = cheerio.load(data);
      const inCinemasSet = new Set();

      const title = $('.movie_name h1')
        .text()
        .trim();
      const uniqueId = createUniqueId(title);

      const [minAge, length] = $('.top__details')
        .text()
        .trim()
        .split(' | ');

      const rawGengers = $('.movie_genres')
        .text()
        .trim()
        .replace(/\s/g, '')
        .split(',');
      const genres = rawGengers.map((genre) => ({ genre, emoji: emojifier(genre) }));

      const description = $('.movie-description')
        .text()
        .trim();
      const trailer = $('.jw-video').attr('src');

      const rawCast = $('.person-container')
        .map((_, element) => {
          const $person = $(element);
          const name = $person
            .find('.person__name')
            .text()
            .trim();
          const rawRole = $person
            .find('.person__role')
            .text()
            .trim();
          const role = rawRole === '' ? 'Actor' : titleize(rawRole);

          return { name, type: role };
        })
        .get();
      const cast = parseCast(rawCast, showcaseCastTypes.actor, showcaseCastTypes.director);

      /* Get dates */
      const $dates = $('.showtime-dates .scroll__content .date');
      const dates = $dates
        .map((index, element) => {
          const link = $(element).attr('href');
          const [rawDate] = link.match(/\d+-\d+-\d+/g);

          return { link, rawDate };
        })
        .get();

      /* Get all shows in parallel per each date */
      const rawShows = await Promise.all(
        dates.map(async (date) => {
          const { link, rawDate } = date;

          const res = await fetch(link);
          const data = await res.text();

          const $ = cheerio.load(data);

          const hasntDate = $('.unavailable').hasClass('no_for_today');
          if (hasntDate) return null;

          const cinemas = $('.accordion')
            .map((_, element) => {
              const $times = $(element).find('.time');
              const isSellAvailable = $(element)
                .find('.times__text')
                .hasClass('times__text--on');
              const cinema = $(element)
                .find('.accordion__title')
                .text()
                .trim();

              inCinemasSet.add(getCinemaId(cinema));

              const times = $times
                .map((index, element) => {
                  const $time = $(element);
                  const $dates = $time.find('.time__date');

                  const rawFormat = $time
                    .find('.time__exhibit-mode')
                    .text()
                    .trim();
                  const [format, version] = rawFormat.split(' ');

                  const dates = $dates
                    .map((_, element) => {
                      const $date = $(element);

                      const link = $date.attr('href');
                      const time = $date.text().trim();

                      return {
                        isSellAvailable,
                        cinemaId: getCinemaId(cinema),
                        format,
                        version,
                        time,
                        date: titleize(dayjs(rawDate).format('dddd D [de] MMMM')),
                        link,
                      };
                    })
                    .get();

                  return dates;
                })
                .get();

              return times;
            })
            .get();

          return cinemas;
        }),
      );

      const inCinemas = [...inCinemasSet];

      const movieShows = rawShows.flat(2);
      shows[uniqueId] = [...(shows[uniqueId] || []), ...movieShows];

      const completeMovie = {
        id: uniqueId,
        cast,
        tags,
        title,
        minAge,
        length,
        poster,
        genres,
        trailer,
        inCinemas,
        description,
      };
      return completeMovie;
    }),
  );

  return { movies: moviesData, shows };
};
