#!/usr/bin/env node

const args = require('yargs').argv;
const cliParser = require(`./helpers/cli-parser`);

global.__staxt = __dirname;

const cliArgument = args._[0];

const cliMethod = cliParser(cliArgument);

if (typeof cliMethod === 'function') {
  cliMethod();
}

return;
