import got from 'got';
import omit from 'lodash.omit';
import camelcaseKeys from 'camelcase-keys';

import { parseCinemas, parseMovies } from './parsers';

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx');
    const dataInPascalCase = JSON.parse(body.slice(15, -1));
    const dataInCamelCase = camelcaseKeys(dataInPascalCase, { deep: true });

    const movies = await parseMovies(dataInCamelCase.films);
    // const moviesWithoutShows = movies.map(movie => omit(movie, 'shows'));

    // const cinemas = parseCinemas(dataInCamelCase.cinemas);
    // const parsedData = { movies, moviesWithoutShows, cinemas };
    const parsedData = { movies };

    return { data: Object.entries(parsedData), error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default getCinemarkData;
