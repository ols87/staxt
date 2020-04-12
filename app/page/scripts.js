const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const scripts = require('../helpers/scripts');
const logger = require('../helpers/logger');

const src = paths.src.pages;
const dist = paths.dist.base;

module.exports = (path = args.p) => {
  if (!path) {
    return logger('red', `Please provide a page path e.g. -p=some/path`);
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}`;

  if (!fs.existsSync(`${file}.js`)) {
    return logger('red', `${name} page js does not exist`);
  }

  if (!fs.existsSync(`${file}.scripts.js`)) {
    return logger('red', `${name} scripts js does not exist`);
  }

  const data = require(file);
  const slug = data.slug;

  const outFile = slug
    ? `${dist}/${slug}/scripts.js`
    : `${dist}/${path}/scripts.js`;

  scripts({ name, file: `${file}.scripts.js`, outFile });
};
