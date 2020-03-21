#!/usr/bin/env node

global.__staxt = __dirname;

const args = require('yargs').argv;
const loader = require('./loader');

const script = args._[0];

if (loader[script]) {
  loader[script]();
}