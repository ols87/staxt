const fs = require('fs-extra');
const args = require('yargs').argv;
const sass = require('sass');

const paths = require('../helpers/paths');
const data = require('../helpers/data');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

const src = paths.src.pages;
const dist = paths.dist.base;

module.exports = (path = args.p) => {
  if (!path) {
    return logger('red', 'Please provide a page path e.g. -p=some/path');
  }

  const name = path.split('/').pop();
  const pagePath = `${src}/${path}/${name}`;
  const file = `${pagePath}.scss`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name}.scss does not exist`);
  }

  timer.start();

  const page = data('compile');
  const outPath = page.slug ? page.slug : path;
  const outFile = `${dist}/${outPath}/style.css`;

  sass.render(
    {
      file: file,
      outputStyle: 'compressed',
      outFile: outFile,
      includePaths: [paths.src.base],
    },
    (error, result) => {
      if (error) return logger('red', error);
      fs.ensureFileSync(outFile);
      fs.writeFileSync(outFile, result.css);
    }
  );

  timer.end().then((seconds) => {
    logger('green', `${name} scss compiled in ${seconds} seconds`);
  });
};
