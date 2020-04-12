#!/usr/bin/env node
const fs = require('fs-extra');
const args = require('yargs').argv;

global.__staxt = `${__dirname}/src`;

const staxt = {
  dev: ['init', 'serve', 'watch', 'bundle'],
  template: ['add', 'remove', 'scripts', 'styles'],
  page: ['add', 'remove', 'scripts', 'styles'],
  assets: ['images', 'scripts', 'styles'],
};

const type = args._[0];
const script = args._[1];

const typeProvided = staxt.hasOwnProperty(type);
const staxtKeys = Object.entries(staxt);

let path = `${type}/${script}`;

if (!typeProvided) {
  for (let [key] of staxtKeys) {
    let hasType = staxt[key].indexOf(type) > -1;
    let keyMatch = args.hasOwnProperty(key.charAt(0));

    if (hasType && keyMatch) {
      path = `${key}/${type}`;
    }
  }
}

if (fs.existsSync(`${__staxt}/${path}.js`)) {
  require(`./src/${path}`)();
}
