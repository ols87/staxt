const templates = require('./staticly/templates');
const cleaner = require('./staticly/cleaner');
const images = require('./staticly/images');

const argv = require('yargs').argv
const prop = argv.module;

const staticly = new class {
  constructor() {
    this.templates = () => templates.init();
    this.cleaner = () => cleaner.init();
    this.images = () => images.copy();
  }

  run() {
    if (!this.hasOwnProperty(prop)) process.exit("No Module");
    this[prop]();
  }
}

staticly.run();