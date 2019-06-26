const titleize = require('titleize')
const dayjs = require('dayjs')

require('dayjs/locale/es')
dayjs.locale('es')

const parseShows = movieList => {
  const [showsParsed] = movieList.map(({ format, version, cinemaList }) => {
    const cinemaWithShows = cinemaList.map(({ id: cinemaId, sessionList }) => {
      const shows = sessionList.map(({ id: sessionId, feature: featureId, dtm: timestamp }) => ({
        timestamp,
        date: titleize(dayjs(timestamp).format('dddd D [de] MMMM')),
        time: dayjs(timestamp).format('HH[:]mm'),
        link: createTicketsLink(cinemaId, sessionId, featureId),
        format: format.toUpperCase(),
        version: titleize(version),
      }))

      return { cinemaId: String(cinemaId), shows }
    })

    return cinemaWithShows
  })

  return showsParsed.flat()
}

const createTicketsLink = (cinemaId, sessionId, featureId) => {
  const baseUrl = 'https://tickets.cinemarkhoyts.com.ar/NSTicketing'
  return `${baseUrl}/?CinemaId=${cinemaId}&SessionId=${sessionId}&FeatureId=${featureId}`
}

module.exports = { parseShows }
