import ApolloServerFastify from 'apollo-server-fastify';

import Cinema from './cinemas';
import Movie from './movies';
import Show from './shows';

const { gql } = ApolloServerFastify;

const Query = gql`
  type Query {
    _empty: String
  }
`;

export default [Query, Cinema, Movie, Show];
