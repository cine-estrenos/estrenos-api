const got = require('got')
const camelcaseKeys = require('camelcase-keys')

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx')
    const data = JSON.parse(body.slice(15, -1))
    const dataInCamelCase = camelcaseKeys(data, { deep: true })

    return { data: Object.entries(dataInCamelCase), error: null }
  } catch (error) {
    return { data: null, error }
  }
}

module.exports = { getCinemarkData }
