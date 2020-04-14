const fs = require('fs-extra');

const paths = require('./paths');
const logger = require('./logger');

const src = paths.src.templates;
const dist = paths.dist.assets.js;

module.exports = (path) => {
  if (!path) {
    logger('red', `Please provide a template path e.g. -t=some/path`);
    process.exit();
  }

  const name = path.split('/').pop();
  const filePath = `${src}/${path}/${name}`;

  const outName = path.replace(src, '').replace(/\//g, '-');
  const outPath = `${dist}/template-${outName}`;

  return {
    name,
    filePath,
    outPath,
  };
};
