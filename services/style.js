const fs = require('fs-extra');
const sass = require('sass');

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const logger = require(`../helpers/logger`);

module.exports = async function styleService({ filePath, srcPath, distPath }) {
  timer.start();

  distPath = distPath.replace('.scss', '.css');

  return await new Promise((resolve) => {
    sass.render(
      {
        file: srcPath,
        outputStyle: 'compressed',
        outFile: distPath,
        includePaths: [`${__staxt}`, paths.src.base],
      },
      (error, result) => {
        if (error) return logger('red', error);

        fs.ensureFileSync(distPath);
        fs.writeFileSync(distPath, result.css);

        timer.end().then((seconds) => {
          logger('green', `${filePath} scss compiled in ${seconds} seconds`);
          resolve();
        });
      }
    );
  });
};
