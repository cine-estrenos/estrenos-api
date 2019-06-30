const { gql } = require('apollo-server-fastify');

module.exports = gql`
  type Shows {
    seats: Int!
    cinemaId: String!
    format: String!
    version: String!
    timestamp: String!
    time: String!
    date: String!
    link: String!
  }

  extend type Query {
    shows(movieId: String!, cinemaId: String): [Shows]
  }
`;
