const got = require('got')

const getCinemarkData = async () => {
  try {
    const { body } = await got('https://www.cinemarkhoyts.com.ar/billboard.ashx')
    const data = JSON.parse(body.slice(15, -1))

    return [data]
  } catch (error) {
    return [null, error]
  }
}

module.exports = { getCinemarkData }
