const { gql } = require('apollo-server-fastify');

module.exports = gql`
  type Coordinates {
    latitude: String!
    longitude: String!
  }

  type Tag {
    tag: String!
    link: String!
  }

  type Cinema {
    id: String!
    description: String!
    name: String!
    coordinates: Coordinates!
    tags: [Tag]!
    busses: [String]!
  }

  extend type Query {
    cinemas: [Cinema]!
  }
`;
