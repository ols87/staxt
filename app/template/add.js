const fs = require('fs-extra');
const args = require('yargs').argv;

const add = require('../helpers/add');

module.exports = (path = args.t) => {
  add({
    path: path,
    type: 'template',
    outPut: (file) => {
      const html = `${__staxt}/files/default.html`;
      const template = `${file}.html`;
      fs.copySync(html, template);

      fs.ensureFileSync(`${file}.scripts.js`);
      fs.ensureFileSync(`${file}.scss`);
    },
  });
};
