#!/usr/bin/env node

const init = require('./staticly/init');
const templates = require('./staticly/templates');
const cleaner = require('./staticly/cleaner');
const images = require('./staticly/images');
const data = require('./staticly/data');

const argv = require('yargs').argv
const prop = argv.run;

const staticly = new class {
  constructor() {
    this.init = () => init.all();
    this.templates = () => templates.init();
    this.page = () => templates.page();
    this.cleaner = () => cleaner.init();
    this.images = () => images.copy();
  }

  run() {
    if (!this.hasOwnProperty(prop)) process.exit("No Module");
    this[prop]();
  }
}

staticly.run();