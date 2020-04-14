const fs = require('fs-extra');
const browserify = require('browserify');
const partialify = require('partialify');

const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = (args) => {
  const { name, file, outFile } = args;

  timer.start();

  if (!fs.existsSync(outFile)) {
    fs.createFileSync(outFile);
  }

  browserify(file)
    .transform(partialify)
    .bundle()
    .pipe(fs.createWriteStream(outFile))
    .on('finish', () => {
      timer.end().then((seconds) => {
        logger('green', `${name} js compiled in ${seconds} seconds`);
      });
    });
};
