const fs = require('fs-extra');
const browserify = require('browserify');
const partialify = require('partialify');

const timer = require(`../helpers/timer`);
const logger = require(`../helpers/logger`);
const config = require(`../helpers/config`);

module.exports = async function scriptService({ filePath, srcPath, distPath }) {
  timer.start();

  if (!fs.existsSync(distPath)) {
    fs.createFileSync(distPath);
  }

  return await new Promise((resolve) => {
    browserify(srcPath, {
      standalone: config.dot.templateSettings.varname,
    })
      .transform(partialify)
      .bundle()
      .pipe(fs.createWriteStream(distPath))
      .on('finish', () => {
        timer.end().then((seconds) => {
          logger('green', `${filePath} js compiled in ${seconds} seconds`);
          resolve();
        });
      });
  });
};
