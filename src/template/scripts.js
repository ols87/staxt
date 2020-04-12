const fs = require('fs-extra');
const args = require('yargs').argv;
const browserify = require('browserify');
const babelify = require('babelify');
const partialify = require('partialify');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = (path = args.t) => {
  const src = paths.src.templates;
  const dist = paths.dist.assets.js;

  if (!path) {
    return logger('red', 'Please provide a template path e.g. -t=some/path');
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}.js`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} template js does not exist`);
  }

  timer.start();

  const outName = path.replace(paths.src.templates, '').replace(/\//g, '-');
  const outFile = `${dist}/template-${outName}.js`;

  if (!fs.existsSync(outFile)) {
    fs.createFileSync(outFile);
  }

  browserify(file)
    .transform(partialify)
    .transform(babelify, {
      cwd: __staxt,
      presets: ['@babel/preset-env', 'minify'],
    })
    .bundle()
    .pipe(fs.createWriteStream(outFile))
    .on('finish', () => {
      timer.end().then((seconds) => {
        logger('green', `${name} js compiled in ${seconds} seconds`);
      });
    });
};
