const titleize = require('titleize')

const parseCinemas = cinemas => {
  const parsedCinemas = cinemas.map(cinema => {
    const { id, description, name, address, features, decLatitude, decLongitude, urlGoogleMaps, buses } = cinema

    return {
      id,
      description,
      name: parseCinemaName(name),
      coordinates: {
        latitude: decLatitude,
        longitude: decLongitude,
      },
      tags: [
        { tag: address, link: urlGoogleMaps },
        { tag: parseCinemaFeatures(features), link: 'https://www.cinemarkhoyts.com.ar/formatos' },
      ],
      buses: parseBuses(buses),
    }
  })

  return parsedCinemas
}

const parseCinemaName = (name = '') => {
  const fixedNames = {
    'Hoyts Moron': 'Hoyts Morón',
    'Hoyts Nuevocentro': 'Hoyts Nuevo Centro',
    'Cinemark Tortugas': 'Cinemark Tortuguitas',
    'Hoyts Moron': 'Hoyts Morón',
    'Cinemark Neuquen': 'Cinemark Neuquén',
  }

  return fixedNames[name] || name
}

const parseCinemaFeatures = (features = []) =>
  features
    .split('|')
    .map((value, index) => (index === 0 ? titleize(value) : value.replace('Y', 'y')))
    .join('|')

const parseBuses = (buses = '') => buses.split(' / ').filter(Boolean)

module.exports = parseCinemas
