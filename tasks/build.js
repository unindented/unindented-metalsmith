'use strict';

import {build} from 'metalsmith-bundle';
import {debug} from '../utils';
import config from '../config';

const log = debug('metalsmith:build');

build(config, (error, success) => {
  if (error) {
    log(error);
    process.exit(1);
  }

  log(success);
});
