const merge = require("lodash.merge");

const cinemas = require("./cinemas");
const movies = require("./movies");
const shows = require("./shows");

module.exports = merge(cinemas, movies, shows);
