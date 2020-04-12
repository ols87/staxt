const fs = require('fs-extra');
const args = require('yargs').argv;

const add = require('../helpers/add');

module.exports = (path = args.p) => {
  add({
    path: path,
    type: 'page',
    outPut: (file) => {
      const data = `module.exports = {}`;
      fs.outputFileSync(`${file}.js`, data);
      fs.ensureFileSync(`${file}.scss`);
    },
  });
};
