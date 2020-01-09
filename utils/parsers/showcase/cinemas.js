export const CINEMAS = {
  'Showcase Belgrano': '994',
  'Showcase Córdoba': '288',
  'Showcase Haedo': '536',
  'Showcase IMAX': '960',
  'Showcase Norcenter': '295',
  'Showcase Quilmes': '249',
  'Showcase Rosario': '230',
  'Showcase Villa Allende': '232',
};

const removeChain = (name = '') => name.replace('Showcase ', '');

export const cinemas = Object.entries(CINEMAS).map(([name, id]) => ({ id, name: removeChain(name), chain: 'IMAX' }));

export const getCinemaId = (cinemaName) => CINEMAS[cinemaName] || '';
