const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const logger = require('../helpers/logger');
const styles = require('../helpers/styles');

const src = paths.src.pages;
const dist = paths.dist.base;

module.exports = (path = args.p) => {
  if (!path) {
    return logger('red', 'Please provide a page path e.g. -p=some/path');
  }

  const name = path.split('/').pop();
  const pagePath = `${src}/${path}/${name}`;
  const file = `${pagePath}.scss`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name}.scss does not exist`);
  }

  const data = require(file);
  const slug = data.slug;
  const outPath = slug ? `${dist}/${slug}` : `${dist}/${path}`;
  const outFile = `${outPath}/style.css`;

  styles({ file, outFile });
};
