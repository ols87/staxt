const fs = require('fs-extra');

const config = require('../helpers/config');
const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

const addPage = require('../page/add');
const addTemplate = require('../template/add');

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

  if (!fs.existsSync(`${paths.base}/staxt.config.js`)) {
    fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);
  }

  addTemplate(config.defaultTemplate);
  addPage('index');

  timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);
  });
};
