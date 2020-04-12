const fs = require('fs-extra');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');

module.exports = function () {
  timer.start();

  fs.copySync(paths.src.assets.images, paths.dist.assets.images);

  timer.end().then((seconds) => {
    logger('green', `Images copied in ${seconds} seconds`);
  });
};
