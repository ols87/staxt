#!/usr/bin/env node

const yargs = require('yargs').argv;

const cli = require('./@staxt/helpers/cli');
const modules = require('./@staxt/staxt.modules');

process.title = 'staxt';
process.on('unhandledRejection', (r) => console.error(r));

new class {
  constructor() {
    cli.fetch(process.argv.slice(2));

    modules.forEach((mod) => {
      if (mod.name === cli.module) {
        this[mod.name] = new mod.fn().init(cli.methods, yargs);
      }
    });
  }
}