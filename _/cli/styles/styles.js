const fs = require('fs-extra');
const sass = require('sass');

const paths = require(`${__staxt}/config/paths`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = (args) => {
  const { path, srcPath, distPath } = args;

  timer.start();

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
        logger('green', `${path} scss compiled in ${seconds} seconds`);
      });
    }
  );
};
