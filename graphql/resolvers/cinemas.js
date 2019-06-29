const {getCinemas} = require("../../resolvers/cinemas");

module.exports = {
  Query: {
    cinemas: getCinemas,
  },
};
