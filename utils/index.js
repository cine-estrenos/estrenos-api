import fetch from 'node-fetch';
import omit from 'lodash.omit';
import camelcaseKeys from 'camelcase-keys';

import { parseCinemas, parseMovies } from './parsers';

const getCinemarkData = async () => {
  try {
    const response = await fetch('https://www.cinemarkhoyts.com.ar/billboard.ashx');
    const data = await response.text();

    const dataInPascalCase = JSON.parse(data.slice(15, -1));
    const dataInCamelCase = camelcaseKeys(dataInPascalCase, { deep: true });

    const movies = await parseMovies(dataInCamelCase.films);
    const moviesWithoutShows = movies.map((movie) => omit(movie, 'shows'));

    const cinemas = parseCinemas(dataInCamelCase.cinemas);
    const parsedData = { movies, moviesWithoutShows, cinemas };

    return { data: Object.entries(parsedData), error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default getCinemarkData;
