const fs = require('fs-extra');
const sass = require('sass');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = (args) => {
  const { name, file, outFile } = args;

  timer.start();

  sass.render(
    {
      file: file,
      outputStyle: 'compressed',
      outFile: outFile,
      includePaths: [`${__staxt}`, paths.src.base],
    },
    (error, result) => {
      if (error) return logger('red', error);

      fs.ensureFileSync(outFile);
      fs.writeFileSync(outFile, result.css);

      timer.end().then((seconds) => {
        logger('green', `${name} scss compiled in ${seconds} seconds`);
      });
    }
  );
};
