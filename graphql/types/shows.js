import ApolloServerFastify from 'apollo-server-fastify';

const { gql } = ApolloServerFastify;

export default gql`
  type Seats {
    total: Int
    available: Int
  }

  type Show {
    id: String!
    cinemaId: String!
    format: String!
    version: String!
    date: String!
    time: String!
    link: String!
    seats: Seats
  }

  extend type Query {
    shows(movieId: String!, cinemaId: String): [Show]
  }
`;
