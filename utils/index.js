import fetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';

// Parsers
import { parseCinemas, parseMoviesAndShows } from './parsers/cinemark';
import { scrapShowcaseMoviesAndShows, showcaseCinemas } from './parsers/showcase';
import { getCinepolisMoviesAndShows, parseCinepolisCinemas } from './parsers/cinepolis';

export const getShowcaseData = async () => {
  try {
    const res = await fetch('https://imax.todoshowcase.com');
    const data = await res.text();

    const { movies, shows } = await scrapShowcaseMoviesAndShows(data);
    const parsedData = { movies, shows, cinemas: showcaseCinemas };

    return { data: parsedData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getCinemarkData = async () => {
  try {
    const response = await fetch('https://www.cinemarkhoyts.com.ar/billboard.ashx');
    const data = await response.text();

    const dataInPascalCase = JSON.parse(data.slice(15, -1));
    const dataInCamelCase = camelcaseKeys(dataInPascalCase, { deep: true });

    const { movies, shows } = parseMoviesAndShows(dataInCamelCase.films);
    const cinemas = parseCinemas(dataInCamelCase.cinemas);

    const parsedData = { movies, shows, cinemas };

    return { data: parsedData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getCinepolisData = async () => {
  try {
    const BASE_URL = 'https://www.cinepolis.com.ar/api';
    const endpoints = [`${BASE_URL}/movies`, `${BASE_URL}/complexes`];

    const [rawMovies, rawCinemas] = await Promise.all(
      endpoints.map(async (endpoint) => {
        const response = await fetch(endpoint);
        const data = await response.json();

        return camelcaseKeys(data, { deep: true });
      }),
    );

    const { movies, shows } = await getCinepolisMoviesAndShows(rawMovies.data);
    const cinemas = parseCinepolisCinemas(rawCinemas);

    const parsedData = { movies, shows, cinemas };

    return { data: parsedData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
