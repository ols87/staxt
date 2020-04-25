const paths = require('../helpers/paths');
const logger = require('../helpers/logger');
const glob = require('../helpers/glob');

const src = paths.src.templates;

const sanitize = (path, type) => {
  if (path.indexOf(`.${type}`) > -1) {
    path = path.split('/').pop();
    path = path.replace(`.${type}`, '');
  }

  return path;
};

const data = (path, out) => {
  if (!path) {
    logger('red', `Please provide a template path e.g. -t=some/path`);
    process.exit();
  }

  const name = path.split('/').pop();
  const filePath = `${src}/${path}/${name}`;

  const outName = path.replace(src, '').replace(/\//g, '-');
  const dist = out ? paths.dist.assets[out] : '';
  const outPath = `${dist}/template-${outName}`;

  return {
    name,
    filePath,
    outPath,
  };
};

const all = (ext) => {
  return glob({
    dir: src,
    includes: [`.${ext}`],
    excludes: [`/${paths.src.includes}`],
  });
};

module.exports = { sanitize, data, all };
