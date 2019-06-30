const { gql } = require('apollo-server-fastify');

module.exports = gql`
  type CinemaWithShows {
    seats: Int!
    timestamp: String!
    date: String!
    time: String!
    link: String!
  }

  type Show {
    formatId: Int!
    format: String!
    version: String!
    cinemaWithShows: [CinemaWithShows]!
  }

  extend type Query {
    shows(movieId: String!, cinemaId: String): [Show]
  }
`;
