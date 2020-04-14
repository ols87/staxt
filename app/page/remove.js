const fs = require('fs-extra');

const args = require('yargs').argv;
const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');
const _page = require('../helpers/page');

const src = paths.src.pages;

module.exports = (path = args.p) => {
  const page = _page(path);

  if (!fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} page does not exist`);
  }

  timer.start();

  fs.removeSync(page.outPath);
  fs.removeSync(`${src}/${path}`);

  timer.end().then((seconds) => {
    logger('green', `${page.name} removed in ${seconds} seconds`);
  });
};
