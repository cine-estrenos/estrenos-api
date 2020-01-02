import titleize from 'titleize';

const getCinemaChain = (name = '') => {
  const cinemaName = name.toLowerCase();

  if (cinemaName.includes('hoyts')) return 'Hoyts';
  if (cinemaName.includes('cinemark')) return 'Cinemark';

  return name;
};

const removeChain = (name = '') => {
  return name.replace('Cinemark ', '').replace('Hoyts ', '');
};

const parseCinemaName = (name = '') => {
  const fixedNames = {
    'Hoyts Moron': 'Hoyts Morón',
    'Hoyts Nuevocentro': 'Hoyts Nuevo Centro',
    'Cinemark Tortugas': 'Cinemark Tortuguitas',
    'Cinemark Neuquen': 'Cinemark Neuquén',
  };

  return removeChain(fixedNames[name] || name);
};

const parseCinemaFeatures = (features = []) =>
  features
    .split('|')
    .map((value, index) => (index === 0 ? titleize(value) : value.replace('Y', 'y')))
    .join('|');

const parseBuses = (buses = '') => buses.split(' / ').filter(Boolean);

const parseCinemas = (cinemas) => {
  const parsedCinemas = cinemas.map((cinema) => {
    const { id, description, name, address, features, decLatitude, decLongitude, urlGoogleMaps, buses } = cinema;

    return {
      description,
      id: String(id),
      name: parseCinemaName(name),
      chain: getCinemaChain(name),
      coordinates: {
        latitude: decLatitude,
        longitude: decLongitude,
      },
      tags: [
        { tag: address, link: urlGoogleMaps },
        {
          tag: parseCinemaFeatures(features),
          link: 'https://www.cinemarkhoyts.com.ar/formatos',
        },
      ],
      buses: parseBuses(buses),
    };
  });

  return parsedCinemas;
};

export default parseCinemas;
