const fs = require('fs-extra');
const args = require('yargs').argv;

const config = require('../helpers/config');
const add = require('../helpers/add');

module.exports = (path = args.p) => {
  add({
    path: path,
    type: 'page',
    outPut: (file) => {
      const data = `module.exports = {\r\ntemplate: '${config.defaultTemplate}'\r\n}`;
      fs.outputFileSync(`${file}.xt.js`, data);
      fs.ensureFileSync(`${file}.js`);
      fs.ensureFileSync(`${file}.scss`);
    },
  });
};
