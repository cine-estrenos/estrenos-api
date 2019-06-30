const titleize = require('titleize')
const dayjs = require('dayjs')
require('dayjs/locale/es')

dayjs.locale('es')

const createTicketsLink = (cinemaId, sessionId, featureId) => {
  const baseUrl = 'https://tickets.cinemarkhoyts.com.ar/NSTicketing'
  return `${baseUrl}/?CinemaId=${cinemaId}&SessionId=${sessionId}&FeatureId=${featureId}`
}

const parseShows = movieList => {
  const showsParsed = movieList.map(({ id: formatId, format, version, cinemaList }) => {
    const cinemaWithShows = cinemaList.map(({ id: cinemaId, sessionList }) => {
      const shows = sessionList.map(({ id: sessionId, feature: featureId, dtm: timestamp, seats }) => ({
        seats,
        cinemaId: String(cinemaId),
        formatId: String(formatId),
        format: titleize(format),
        version: titleize(version),
        time: dayjs(timestamp).format('HH[:]mm'),
        date: titleize(dayjs(timestamp).format('dddd D [de] MMMM')),
        link: createTicketsLink(cinemaId, sessionId, featureId),
      }))

      return shows
    })

    return cinemaWithShows
  })

  return showsParsed.flat(2)
}

module.exports = { parseShows }
