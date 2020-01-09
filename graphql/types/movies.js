import ApolloServerFastify from 'apollo-server-fastify';

const { gql } = ApolloServerFastify;

export default gql`
  type Cast {
    directors: [String]!
    actors: [String]!
  }

  type Genre {
    value: String!
    emoji: String!
  }

  type Movie {
    ids: [String]!
    imdbId: String
    cast: Cast!
    votes: String!
    title: String!
    minAge: String!
    length: String!
    poster: String!
    backdrop: String!
    genres: [Genre]!
    tags: [String]!
    inCinemas: [String]!
    description: String!
    trailer: String
  }

  extend type Query {
    movies(limit: Int, cinemaId: String): [Movie]!
    movie(id: String!): Movie
  }
`;
