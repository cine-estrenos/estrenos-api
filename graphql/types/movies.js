const { gql } = require('apollo-server-fastify');

module.exports = gql`
  type Cast {
    directors: [String]!
    actors: [String]!
  }

  type Category {
    value: String!
    emoji: String!
  }

  type Movie {
    id: String!
    cast: Cast!
    title: String!
    minAge: String!
    length: String!
    poster: String!
    category: Category!
    inCinemas: [String]!
    isPremiere: Boolean!
    description: String!
    amazonTrailerUrl: String!
  }

  extend type Query {
    movies: [Movie]!
    movie(id: String!): Movie
  }
`;
