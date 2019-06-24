const got = require('got')
const titleize = require('titleize')

const { emojifier } = require('../lib')

const parseMovies = async movies => {
  // Remove special or festival movies
  const premieres = movies.filter(({ attributeList }) => !attributeList.includes(2) && !attributeList.includes(3))

  // Parse movies to match new structure
  const parsedMovies = premieres
    .map(premiere => {
      const {
        id,
        name,
        rating,
        description,
        duration,
        category,
        urlPoster,
        urlTrailerAmazon,
        urlTrailerYoutube,
        personList,
        cinemaList,
        attributeList,
      } = premiere

      const movie = {
        name: titleize(name),
        minAge: rating.split(' ')[0],
        duration: `${duration} minutos`,
        category: {
          value: category,
          emoji: emojifier(category),
        },
        id,
        description,
        poster: urlPoster,
        inCinemas: cinemaList,
        amazonTrailerUrl: urlTrailerAmazon,
        youtubeTrailerUrl: urlTrailerYoutube.split('.be/')[1],
        isPremiere: attributeList.includes(0),
        cast: getDirectorsAndActors(personList),
      }

      return movie
    })
    .sort((a, b) => b.isPremiere - a.isPremiere)

  // Get new high quality posters and more info
  const moviesWithHighQualityPoster = await Promise.all(
    parsedMovies.map(async movie => {
      try {
        const imdbInfo = await getImdbInfo(movie.name)
        return { ...movie, ...imdbInfo }
      } catch (error) {
        return movie
      }
    })
  )

  return moviesWithHighQualityPoster
}

const getDirectorsAndActors = cast => {
  return cast.reduce(
    (cast, { Type, Name }) => {
      if (Type === 'D') {
        cast.directors.push(name)
        return cast
      }

      if (Type === 'A') {
        cast.actors.push(name)
        return cast
      }
    },
    { directors: [], actors: [] }
  )
}

const getImdbInfo = async title => {
  const currentYear = new Date().getFullYear()

  const apiKey = process.env.MOVIEDB_APIKEY
  const baseUrl = 'https://api.themoviedb.org/3/search/movie'
  const options = `&page=1&include_adult=false&year=${currentYear}`
  const endpoint = `${baseUrl}?api_key=${apiKey}&query=${encodeURI(title)}${options}`

  const { body } = await got(endpoint)
  const data = JSON.parse(body)
  if (data.total_results === 0 || data.total_results > 1) return

  const [movie] = data.results
  const { title: name, vote_average: votes, poster_path: posterPath } = movie

  const baseImageUrl = 'https://image.tmdb.org/t/p'
  const withWidth = width => `w${width}`

  const poster = `${baseImageUrl}/${withWidth(300)}/${posterPath}`
  const votesParsed = String(votes).length === 1 ? `${votes}.0` : `${votes}`

  return { name, votes: votesParsed, poster }
}

module.exports = parseMovies
