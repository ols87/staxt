const fs = require('fs-extra');
const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const directory = 'templates';

const outFunction = function outPutTemplateFiles({ srcPath }) {
  fs.ensureFileSync(`${srcPath}.html`);
  fs.ensureFileSync(`${srcPath}.js`);
  fs.ensureFileSync(`${srcPath}.scss`);
};

module.exports = (filePath = args.t) => {
  addService({
    filePath,
    directory,
    outFunction,
  });
};
