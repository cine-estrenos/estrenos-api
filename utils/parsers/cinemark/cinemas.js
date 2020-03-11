const getCinemaChain = (name = '') => {
  const cinemaName = name.toLowerCase();

  if (cinemaName.includes('hoyts')) return 'Hoyts';
  if (cinemaName.includes('cinemark')) return 'Cinemark';

  return name;
};

const removeChain = (name = '') => name.replace('Cinemark ', '').replace('Hoyts ', '');

const parseCinemaName = (name = '') => {
  const fixedNames = {
    'Hoyts Moron': 'Hoyts Morón',
    'Hoyts Nuevocentro': 'Hoyts Nuevo Centro',
    'Cinemark Tortugas': 'Cinemark Tortuguitas',
    'Cinemark Neuquen': 'Cinemark Neuquén',
  };

  return removeChain(fixedNames[name] || name);
};

const parseCinemas = (cinemas) => {
  const parsedCinemas = cinemas.map((cinema) => {
    const { id, name, decLatitude, decLongitude } = cinema;

    return {
      id: String(id),
      lat: Number(decLatitude),
      lon: Number(decLongitude),
      name: parseCinemaName(name),
      chain: getCinemaChain(name),
    };
  });

  return parsedCinemas;
};

export default parseCinemas;
