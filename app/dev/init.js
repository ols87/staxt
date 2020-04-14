const fs = require('fs-extra');
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
    `${paths.src.assets.scss}/main.scss`,
    `${paths.src.assets.js}/main.js`,
  ];

  timer.start();

  dirs.forEach((dir) => fs.ensureDirSync(dir));

  files.forEach((file) => fs.ensureFileSync(file));

  fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);

  timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);
  });
};
