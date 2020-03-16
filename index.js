#!/usr/bin/env node

const log = require('./@staxt/helpers/log');
const cli = require('./@staxt/helpers/cli');
const modules = require('./@staxt/staxt.modules');

process.title = 'staxt';
process.on('unhandledRejection', r => log('red', r));

const scripts = cli.fetch(process.argv.slice(2));
const moduleNames = modules.map(mod => mod.name);

if (!scripts.module) {
  log('red', 'No staxt module supplied');
  log('magenta', `Available modules: ${moduleNames.join(', ')}`);
  process.exit();
}

modules.forEach((mod) => {
  if (mod.name === scripts.module) {
    this[mod.name] = mod.fn();
  }
});