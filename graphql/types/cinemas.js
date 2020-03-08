import ApolloServerFastify from 'apollo-server-fastify';

const { gql } = ApolloServerFastify;

export default gql`
  type Cinema {
    id: String!
    name: String!
    chain: String!
    lat: Int!
    lon: Int!
  }

  extend type Query {
    cinemas: [Cinema]!
  }
`;
