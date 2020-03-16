#!/usr/bin/env node

const yargs = require('yargs').argv;

const cli = require('./@staxt/helpers/cli');
const modules = require('./@staxt/helpers/modules');

process.title = 'staxt';
process.on('unhandledRejection', (r) => console.error(r));

new class {
  constructor() {
    cli.fetch(process.argv.slice(2));

    modules.forEach((module) => {
      if (module.name === cli.module) {
        this[module.name] = module.fn.init(cli.methods, yargs);
      }
    });
  }
}