const fs = require('fs-extra');
const sass = require('sass');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = function (path = args.a, outPath = args.o) {
  const src = paths.src.assets.scss;
  const dist = paths.dist.assets.css;

  timer.start();

  const file = path || `${src}/main.scss`;
  const outFile = outPath || `${dist}main.css`;

  sass.render(
    {
      file: file,
      outputStyle: 'compressed',
      outFile: outFile,
      includePaths: [`${__staxt}`, paths.src.base],
    },
    (error, result) => {
      if (error) return logger('red', error);
      fs.ensureFileSync(`${dist}/main.css`);
      fs.writeFileSync(`${dist}/main.css`, result.css);
    }
  );

  timer.end().then((seconds) => {
    logger('green', `scss compiled in ${seconds} seconds`);
  });
};
