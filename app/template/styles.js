const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const logger = require('../helpers/logger');
const styles = require('../helpers/styles');

const src = paths.src.templates;
const dist = paths.dist.assets.css;

module.exports = (path = args.t) => {
  if (!path) {
    return logger('red', 'Please provide a template path e.g. -t=some/path');
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}.scss`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} template scss does not exist`);
  }

  const outName = path.replace(paths.src.templates, '').replace(/\//g, '-');
  const outFile = `${dist}/template-${outName}.css`;

  styles({ file, outFile });
};
