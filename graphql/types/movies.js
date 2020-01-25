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

  type Trailer {
    href: String
    type: String
  }

  type Movie {
    id: String!
    slug: String!
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
    trailer: Trailer!
  }

  extend type Query {
    movies(limit: Int, name: String, cinemaId: String): [Movie]!
    movie(id: String!): Movie
  }
`;
