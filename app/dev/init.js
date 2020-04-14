const fs = require('fs-extra');
// const bundle = require('./bundle');
const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = () => {
  const dirs = [
    paths.src.assets.base,
    paths.src.assets.images,
    paths.src.assets.js,
    paths.src.assets.scss,
    paths.src.includes,
    paths.dist.base,
  ];

  const files = [
    `${paths.src.templates}/default/default.scripts.js`,
    `${paths.src.templates}/default/default.scss`,
    `${paths.src.pages}/index.scss`,
    `${paths.src.assets.scss}/main.scss`,
    `${paths.src.assets.js}/main.js`,
  ];

  timer.start();

  dirs.forEach((dir) => fs.ensureDirSync(dir));
  files.forEach((file) => fs.ensureFileSync(file));

  fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);

  fs.copySync(
    `${__staxt}/files/default.html`,
    `${paths.src.templates}/default/default.html`
  );

  fs.copySync(
    `${__staxt}/files/header.html`,
    `${paths.src.includes}/header.html`
  );

  fs.copySync(
    `${__staxt}/files/footer.html`,
    `${paths.src.includes}/footer.html`
  );

  fs.copySync(`${__staxt}/files/index.js`, `${paths.src.pages}/index.js`);

  fs.ensureFileSync(`${paths.src.pages}/index.scripts.js`);

  // bundle();

  timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);
  });
};
