const fs = require('fs-extra');

const args = require('yargs').argv;
const paths = require('../helpers/paths');
const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function (path = args.p) {
  timer.start();

  fs.remove(`${paths.src.pages}/${path}`);
  fs.remove(`${paths.dist.base}/${path}`);

  timer.end().then(seconds => {
    logger('green', `${path} removed in ${seconds} seconds`);
  });
}