const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const scripts = require('../helpers/scripts');
const logger = require('../helpers/logger');

const src = paths.src.templates;
const dist = paths.dist.assets.js;

module.exports = (path = args.t) => {
  if (!path) {
    return logger('red', `Please provide a template path e.g. -t=some/path`);
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}.js`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} template js does not exist`);
  }

  const outName = path.replace(src, '').replace(/\//g, '-');
  const outFile = `${dist}/template-${outName}.js`;

  scripts({ name, file, outFile });
};
