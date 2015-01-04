'use strict';

import {build} from 'metalsmith-bundle';
import {debug} from '../utils';
import config from '../config';

const log = debug('metalsmith:watch');

build(config, function (error, success) {
  if (error) {
    log(error);
    return;
  }

  log(success);
});
