const fs = require('fs-extra');
const args = require('yargs').argv;

const scripts = require('../helpers/scripts');
const _page = require('../helpers/page');
const logger = require('../helpers/logger');

const compile = require('./compile');

module.exports = (path = args.p) => {
  const page = _page(path);

  const name = page.name;
  const file = `${page.filePath}.js`;
  const outFile = `${page.outPath}/scripts.js`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} js does not exist`);
  }

  if (!fs.readFileSync(file, 'utf8')) return;

  scripts({ file, name, outFile });

  if (!page.hasScripts) {
    compile(path);
  }
};
