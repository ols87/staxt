const fs = require('fs-extra');
const args = require('yargs').argv;

const styles = require('../helpers/styles');
const _page = require('../helpers/page');
const logger = require('../helpers/logger');

const compile = require('./compile');

module.exports = (path = args.p) => {
  const page = _page(path);

  const file = `${page.filePath}.scss`;
  const outFile = `${page.outPath}/style.css`;

  if (!fs.existsSync(file)) {
    return logger('red', `${page.name}.scss does not exist`);
  }

  if (!fs.readFileSync(file, 'utf8')) return;

  styles({ file, outFile });

  if (!page.hasScripts) {
    compile(page.name);
  }
};
