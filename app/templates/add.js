const fs = require('fs-extra');
const args = require('yargs').argv;

const add = require('../helpers/add');

module.exports = (path = args.t) => {
  add({
    path: path,
    type: 'templates',
    outPut: (file) => {
      fs.ensureFileSync(`${file}.html`);
      fs.ensureFileSync(`${file}.js`);
      fs.ensureFileSync(`${file}.scss`);
    },
  });
};
