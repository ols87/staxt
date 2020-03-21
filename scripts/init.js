const fs = require('fs-extra');
const bundle = require('./bundle');
const paths = require('../helpers/paths');
const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function () {
  const dirs = [
    paths.src.assets.base,
    paths.src.assets.images,
    paths.src.assets.js,
    paths.src.assets.scss,
    paths.src.includes,
    paths.dist.base
  ];

  const files = [
    `${paths.src.pages}/index.scss`,
    `${paths.src.assets.scss}/main.scss`,
    `${paths.src.assets.js}/main.js`
  ];

  timer.start();

  dirs.forEach(dir => fs.ensureDirSync(dir));
  files.forEach(file => fs.ensureFileSync(file));

  fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);
  fs.copySync(`${__staxt}/files/default.hbs`, `${paths.src.templates}/default.hbs`);
  fs.copySync(`${__staxt}/files/header.hbs`, `${paths.src.includes}/header.hbs`);
  fs.copySync(`${__staxt}/files/footer.hbs`, `${paths.src.includes}/footer.hbs`);
  fs.copySync(`${__staxt}/files/index.js`, `${paths.src.pages}/index.js`);

  bundle();

  timer.end().then(seconds => {
    logger('green', `Project init in ${seconds} seconds`);
  });
}