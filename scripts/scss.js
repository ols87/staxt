const fs = require('fs-extra');
const sass = require('sass');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function () {
  const src = paths.src.assets.scss;
  const dist = paths.dist.assets.css;

  timer.start();

  sass.render({
    file: `${src}/main.scss`,
    outputStyle: 'compressed',
    outFile: `${dist}main.css`
  }, (error, result) => {
    if (error) return this.logger('red', error);
    fs.ensureFileSync(`${dist}/main.css`);
    fs.writeFileSync(`${dist}/main.css`, result.css);
  });

  timer.end().then(seconds => {
    logger('green', `SCSS compiled in ${seconds} seconds`);
  });
}