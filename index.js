#!/usr/bin/env node

const args = require('yargs').argv;
const loader = require(`./helpers/loader`);

global.__staxt = __dirname;

let type = args._[0];

let method = loader(type);

require(method)();

return;
