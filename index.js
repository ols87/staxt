#!/usr/bin/env node

const logger = require('./@staxt/helpers/logger');
const cli = require('./@staxt/helpers/cli-parser');
const modules = require('./@staxt/staxt.modules');

process.title = 'staxt';
process.on('unhandledRejection', r => logger('red', r));

const scripts = cli.fetch(process.argv.slice(2));
const moduleNames = modules.map(mod => mod.name);

if (!scripts.module) {
  logger('red', 'No staxt module supplied');
  logger('magenta', `Available modules: ${moduleNames.join(', ')}`);
  process.exit();
}

modules.forEach((mod) => {
  if (mod.name === scripts.module) {
    this[mod.name] = mod.fn();
  }
});

if (!this[scripts.module]) {
  logger('red', `Incorrect staxt module: [${scripts.module}]`);
  logger('magenta', `Available modules: ${moduleNames.join(', ')}`);
  process.exit();
}