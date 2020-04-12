const fs = require('fs-extra');

const args = require('yargs').argv;
const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

const src = paths.src.pages;
const dist = paths.dist.base;

module.exports = (path = args.p) => {
  if (!path) {
    return logger('red', 'Please provide a page path e.g. -p=some/path');
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}.js`;

  if (!fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} page does not exist`);
  }

  timer.start();

  const data = require(file);
  const slug = data.compile.slug;

  const distPath = slug ? `${dist}/${slug}` : `${dist}/${path}`;

  fs.removeSync(distPath);

  fs.removeSync(`${src}/${path}`);

  timer.end().then((seconds) => {
    logger('green', `${name} removed in ${seconds} seconds`);
  });
};
