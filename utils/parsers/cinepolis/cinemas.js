const CINEMAS_LOCATIONS = {
  1: {
    lat: -34.5890959,
    lon: -58.3946215,
  },
  2: {
    lat: -38.9461692,
    lon: -68.0774417,
  },
  3: {
    lat: -32.9023973,
    lon: -68.7991886,
  },
  4: {
    lat: -32.9340619,
    lon: -60.7031324,
  },
  5: {
    lat: -34.6789307,
    lon: -58.3333284,
  },
  6: {
    lat: -34.4420163,
    lon: -58.8738722,
  },
  7: {
    lat: -34.618529,
    lon: -58.4396563,
  },
  8: {
    lat: -32.9780243,
    lon: -68.8006179,
  },
  9: {
    lat: -34.6667232,
    lon: -58.7051644,
  },
  10: {
    lat: -34.5462986,
    lon: -59.1119157,
  },
};

const parseCinepolisCinemas = (cinemas) => {
  const parsedCinemas = cinemas.map(({ id, name: cinemaName }) => {
    const [chain, name] = cinemaName.split(' ');
    const location = CINEMAS_LOCATIONS[id];

    return {
      id,
      name,
      chain,
      ...location,
    };
  });

  return parsedCinemas;
};

export default parseCinepolisCinemas;
