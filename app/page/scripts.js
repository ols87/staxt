const fs = require('fs-extra');
const args = require('yargs').argv;

const scripts = require('../helpers/scripts');
const _page = require('../helpers/page');
const logger = require('../helpers/logger');

module.exports = (path = args.p) => {
  const page = _page(path);

  const name = page.name;
  const file = `${page.filePath}.scripts.js`;
  const outFile = `${page.outPath}/scripts.js`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} scripts js does not exist`);
  }

  scripts({ file, name, outFile });
};
