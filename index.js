#!/usr/bin/env node

const fs = require('fs-extra');
const args = require('yargs').argv;

global.__staxt = `${__dirname}/app`;

const cli = {
  dev: ['init', 'serve', 'watch', 'bundle'],
  template: ['add', 'remove', 'scripts', 'styles'],
  page: ['add', 'remove', 'scripts', 'styles'],
  assets: ['images', 'libs', 'scripts', 'styles'],
};

const modules = Object.entries(cli);

let type = args._[0];
let script = args._[1];

if (!type) return;

let matches = [];

if (!script) {
  script = type;
  type = null;

  for (let [key, value] of modules) {
    let arg = key.charAt(0);

    if (!type && value.indexOf(script) > -1) {
      matches.push(key);
    }

    if (args.hasOwnProperty(arg)) {
      type = key;
      matches = [];
    }
  }
}

if (matches.length === 1) {
  type = matches[0];
}

const file = `${type}/${script}`;
const path = `${__staxt}/${file}`;

if (fs.existsSync(`${path}.js`)) {
  require(`${path}`)();
}
