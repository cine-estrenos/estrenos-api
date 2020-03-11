import R from 'ramda';

export const CINEMAS = {
  'Showcase Belgrano': {
    id: '994',
    lat: -34.5541347,
    lon: -58.4554208,
  },
  'Showcase Córdoba': {
    id: '288',
    lat: -31.3930053,
    lon: -64.2077467,
  },
  'Showcase Haedo': {
    id: '536',
    lat: -34.6391014,
    lon: -58.5820816,
  },
  'Showcase IMAX': {
    id: '960',
    lat: -34.5145009,
    lon: -58.5250282,
  },
  'Showcase Norcenter': {
    id: '295',
    lat: -34.5146769,
    lon: -58.5258385,
  },
  'Showcase Quilmes': {
    id: '249',
    lat: -34.7245822,
    lon: -58.2579362,
  },
  'Showcase Rosario': {
    id: '230',
    lat: -32.9280315,
    lon: -60.669989,
  },
  'Showcase Villa Allende': {
    id: '232',
    lat: -31.2999455,
    lon: -64.2789907,
  },
};

const removeChain = (name = '') => name.replace('Showcase ', '');

export const cinemas = Object.entries(CINEMAS).map(([key, { id, lat, lon }]) => ({
  id,
  lat,
  lon,
  chain: 'Showcase',
  name: removeChain(key),
}));

export const getCinemaId = (cinemaName) => R.pathOr('', [cinemaName, 'id'], CINEMAS);
