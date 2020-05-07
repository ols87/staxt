const fs = require('fs-extra');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');
const config = require(`../helpers/config`);

module.exports = async function images() {
  await config.hooks.images.before();

  timer.start();

  fs.copySync(paths.src.assets.images, paths.dist.assets.images);

  timer.end().then((seconds) => {
    logger('green', `Images copied in ${seconds} seconds`);
  });

  return await config.hooks.images.after();
};
