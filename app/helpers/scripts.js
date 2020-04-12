const fs = require('fs-extra');
const browserify = require('browserify');
const babelify = require('babelify');
const partialify = require('partialify');

const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = (args) => {
  const { name, file, outFile } = args;

  timer.start();

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
