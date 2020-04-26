const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require(`${__staxt}/config/paths`);
const logger = require(`${__staxt}/helpers/logger`);
const exists = require(`${__staxt}/helpers/exists`);

const scripts = require('../scripts');

const src = paths.src.assets.js;
const dist = paths.dist.assets.js;

module.exports = (path = args.a, out = args.o || path) => {
  if (typeof path !== 'string') {
    logger('red', `No src file given, use -a=some/path`);
    return process.exit();
  }

  const srcPath = `${src}/${path}.js`;
  const distPath = `${dist}${out}.js`;

  if (!exists(path, srcPath)) return;

  scripts({ path, srcPath, distPath });
};
