import fetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';

import { scrapImaxMovies, imaxCinemas } from './parsers/imax';
import { parseCinemas, parseMovies } from './parsers/cinemark';

export const getImaxData = async () => {
  try {
    const res = await fetch('https://imax.todoshowcase.com');
    const data = await res.text();

    const movies = await scrapImaxMovies(data);
    const parsedData = { movies, cinemas: imaxCinemas };

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

    const movies = await parseMovies(dataInCamelCase.films);
    const cinemas = parseCinemas(dataInCamelCase.cinemas);

    const parsedData = { movies, cinemas };

    return { data: parsedData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
