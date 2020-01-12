import merge from 'lodash.merge';

import cinemas from './cinemas';
import movies from './movies';
import shows from './shows';

export default merge(cinemas, movies, shows);
