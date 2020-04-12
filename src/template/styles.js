const fs = require('fs-extra');
const args = require('yargs').argv;
const sass = require('sass');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = (path = args.t) => {
  const src = paths.src.templates;
  const dist = paths.dist.assets.css;

  if (!path) {
    return logger('red', 'Please provide a template path e.g. -t=some/path');
  }

  const name = path.split('/').pop();
  const file = `${src}/${path}/${name}.scss`;

  if (!fs.existsSync(file)) {
    return logger('red', `${name} template scss does not exist`);
  }

  timer.start();

  const outName = path.replace(paths.src.templates, '').replace(/\//g, '-');
  const outFile = `${dist}/template-${outName}.css`;

  timer.start();

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
    logger('green', `${name} template scss compiled in ${seconds} seconds`);
  });
};
