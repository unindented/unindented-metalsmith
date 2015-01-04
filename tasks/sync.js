'use strict';

import {spawn} from 'child_process';
import config from '../config';

const src = config.sync.source;
const dst = config.sync.destination;
const opts = config.sync.options.concat(src, dst);

spawn('rsync', opts, {stdio: 'inherit'});
