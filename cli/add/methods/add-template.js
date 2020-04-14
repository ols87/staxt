const fs = require('fs-extra');
const args = require('yargs').argv;

const add = require('../add.service');

const type = 'templates';

module.exports = (path = args.t) => {
  const write = (file) => {
    fs.ensureFileSync(`${file}.html`);
    fs.ensureFileSync(`${file}.js`);
    fs.ensureFileSync(`${file}.scss`);
  };

  add({ path, type, write });
};
