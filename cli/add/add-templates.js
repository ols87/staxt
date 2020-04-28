const fs = require('fs-extra');
const args = require('yargs').argv;

const add = require('../add');

module.exports = (path = args.t) => {
  add(path, 'templates', (srcPath) => {
    fs.ensureFileSync(`${srcPath}.html`);
    fs.ensureFileSync(`${srcPath}.js`);
    fs.ensureFileSync(`${srcPath}.scss`);
  });
};
