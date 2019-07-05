import ApolloServerFastify from 'apollo-server-fastify';

import typeDefs from '../graphql/types';
import resolvers from '../graphql/resolvers';

const { ApolloServer } = ApolloServerFastify;
const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler();
