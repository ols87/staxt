const fs = require('fs-extra');
const args = require('yargs').argv;

const styles = require('../helpers/styles');
const _page = require('../helpers/page');
const logger = require('../helpers/logger');

module.exports = (path = args.p) => {
  const page = _page(path);

  const file = `${page.filePath}.scss`;
  const outFile = `${page.outPath}/style.css`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name}.scss does not exist`);
  }

  styles({ file, outFile });
};
