'use strict';

require('babel/register')({stage: 1});

// Parse arguments.
const parse = require('minimist');
const argv = parse(process.argv.slice(2));
const task = argv._.shift();

// Use a default config if one is not provided.
process.env.CONFIG = process.env.CONFIG || task;

// Enable logging for certain namespaces.
const debug = require('debug');
const config = require('./config');
const prefix = function (name) {
  return 'metalsmith:' + name;
};
debug.enable(config.debug.map(prefix).join(','));

// Require the specified task.
require('./tasks/' + task);
