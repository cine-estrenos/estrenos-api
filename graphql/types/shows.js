import ApolloServerFastify from 'apollo-server-fastify';

const { gql } = ApolloServerFastify;

export default gql`
  type Seats {
    totalSeats: Int!
    availableSeats: Int!
  }

  type Show {
    id: String!
    isSellAvailable: Boolean
    cinemaId: String!
    format: String!
    version: String!
    timestamp: String!
    time: String!
    date: String!
    link: String!
    seats: Seats
  }

  extend type Query {
    shows(movieId: String!, cinemaId: String): [Show]
  }
`;
