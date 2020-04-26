const args = require('yargs').argv;

const paths = require(`${__staxt}/config/paths`);
const logger = require(`${__staxt}/helpers/logger`);
const exists = require(`${__staxt}/helpers/exists`);

const styles = require('../styles');

const src = paths.src.assets.scss;
const dist = paths.dist.assets.css;

module.exports = (path = args.a, out = args.o || path) => {
  if (typeof path !== 'string') {
    logger('red', `No src file given, use -a=some/path`);
    return process.exit();
  }

  const srcPath = `${src}/${path}.scss`;
  const distPath = `${dist}${out}.css`;

  if (!exists(path, srcPath)) return;

  styles({ path, srcPath, distPath });
};
