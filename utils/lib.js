const got = require('got')
const camelcaseKeys = require('camelcase-keys')

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx')
    const data = JSON.parse(body.slice(15, -1))

    const dataInCamelCase = camelcaseKeys(data, { deep: true })
    const dataStringified = JSON.stringify(dataInCamelCase)

    return [dataStringified]
  } catch (error) {
    return [null, error]
  }
}

module.exports = { getCinemarkData }
