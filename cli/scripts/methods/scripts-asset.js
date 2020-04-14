const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require(`${__staxt}/helpers/paths`);
const logger = require(`${__staxt}/helpers/logger`);

const scripts = require('../scripts.service');

const src = paths.src.assets.js;
const dist = paths.dist.assets.js;

module.exports = (file = args.a || 'main', out = args.o || 'main') => {
  if (!fs.existsSync(`${src}/${file}.js`)) {
    return logger('red', `${file}.js not found`);
  }

  scripts({
    name: 'main',
    file: `${src}/${file}.js`,
    outFile: `${dist}/${out}.js`,
  });
};
