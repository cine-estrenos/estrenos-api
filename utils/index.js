const got = require('got')
const omit = require('lodash.omit')
const camelcaseKeys = require('camelcase-keys')

const { parseCinemas, parseMovies } = require('./parsers')

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx')
    const data = JSON.parse(body.slice(15, -1))
    const dataInCamelCase = camelcaseKeys(data, { deep: true })

    const movies = await parseMovies(dataInCamelCase.films)
    const moviesWithoutShows = movies.map(movie => omit(movie, 'shows'))

    const cinemas = parseCinemas(dataInCamelCase.cinemas)
    const parsedData = { movies, moviesWithoutShows, cinemas }

    return { data: Object.entries(parsedData), error: null }
  } catch (error) {
    return { data: null, error }
  }
}

module.exports = getCinemarkData
