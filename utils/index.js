const got = require('got')
const camelcaseKeys = require('camelcase-keys')

const { parseCinemas, parseMovies } = require('./parsers')

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx')
    const data = JSON.parse(body.slice(15, -1))
    const dataInCamelCase = camelcaseKeys(data, { deep: true })

    const parsedData = {
      movies: await parseMovies(dataInCamelCase.films),
      cinemas: parseCinemas(dataInCamelCase.cinemas),
    }

    return { data: Object.entries(parsedData), error: null }
  } catch (error) {
    return { data: null, error }
  }
}

module.exports = getCinemarkData
