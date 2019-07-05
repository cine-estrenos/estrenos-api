import getCinemasResolver from '../../resolvers/cinemas';

export default {
  Query: {
    cinemas: getCinemasResolver,
  },
};
