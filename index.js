#!/usr/bin/env node

const args = require('yargs').argv;
const loader = require(`./helpers/cli-parser`);

global.__staxt = __dirname;

const cliArgument = args._[0];

const cliMethod = loader(cliArgument);

if (typeof cliMethod === 'function') {
  cliMethod();
}

return;
