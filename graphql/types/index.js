const { gql } = require('apollo-server-fastify');

const Cinema = require('./cinemas');
const Movie = require('./movies');
const Show = require('./shows');

const Query = gql`
  type Query {
    _empty: String
  }
`;

module.exports = [Query, Cinema, Movie, Show];
