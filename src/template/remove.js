const fs = require('fs-extra');

const args = require('yargs').argv;
const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = (path = args.t) => {
  const src = paths.src.templates;
  const js = paths.dist.assets.js;
  const css = paths.dist.assets.css;

  if (!path) {
    return logger('red', 'Please provide a template path e.g. -t=some/path');
  }

  const name = path.split('/').pop();

  if (!fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} template does not exist`);
  }

  timer.start();

  const fileName = path.replace(paths.src.templates, '').replace(/\//g, '-');
  const jsFile = `${js}/template-${fileName}.js`;
  const cssFile = `${css}/template-${fileName}.css`;

  fs.removeSync(`${src}/${path}`);
  fs.removeSync(jsFile);
  fs.removeSync(cssFile);

  timer.end().then((seconds) => {
    logger('green', `${name} removed in ${seconds} seconds`);
  });
};
