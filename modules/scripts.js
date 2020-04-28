const fs = require('fs-extra');
const browserify = require('browserify');
const partialify = require('partialify');

const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = function scriptsModule(options) {
  const { fileName, srcPath, distPath } = options;

  timer.start();

  if (!fs.existsSync(distPath)) {
    fs.createFileSync(distPath);
  }

  browserify(srcPath)
    .transform(partialify)
    .bundle()
    .pipe(fs.createWriteStream(distPath))
    .on('finish', () => {
      timer.end().then((seconds) => {
        logger('green', `${fileName} js compiled in ${seconds} seconds`);
      });
    });
};
