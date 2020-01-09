import ApolloServerFastify from 'apollo-server-fastify';

const { gql } = ApolloServerFastify;

export default gql`
  type Shows {
    isSellAvailable: Boolean
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
