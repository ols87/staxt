const fs = require('fs-extra');
const paths = require('../helpers/paths');

const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function () {
  const dirs = [
    paths.src.assets.images,
    paths.src.includes,
    paths.dist.base
  ];

  const files = [
    `${paths.src.pages}/index.scss`,
    `${paths.src.assets.scss}/main.scss`,
    `${paths.src.assets.js}/main.js`
  ];

  timer.start();

  fs.copySync(paths.src.assets.images, paths.dist.assets.images);

  dirs.forEach(dir => fs.ensureDir(dir));
  files.forEach(file => fs.ensureFile(file));

  fs.copySync(`${__staxt}/files/.babelrc`, `${paths.base}/.babelrc`);
  fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);
  fs.copySync(`${__staxt}/files/default.hbs`, `${paths.src.templates}/default.hbs`);
  fs.copySync(`${__staxt}/files/header.hbs`, `${paths.src.includes}/header.hbs`);
  fs.copySync(`${__staxt}/files/footer.hbs`, `${paths.src.includes}/footer.hbs`);
  fs.copySync(`${__staxt}/files/index.js`, `${paths.src.pages}/index.js`);

  timer.end().then(seconds => {
    logger('green', `Project init in ${seconds} seconds`);
  });
}