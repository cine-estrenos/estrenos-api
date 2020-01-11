import R from 'ramda';

import cinemas from './cinemas';
import movies from './movies';
import shows from './shows';

export default R.mergeAll([cinemas, movies, shows]);
