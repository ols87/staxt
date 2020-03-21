const compile = require('./compile');
const scss = require('./scss');
const js = require('./js');
const images = require('./images');

const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function () {
  timer.start();

  compile();
  scss();
  js();
  images();

  timer.end().then(seconds => {
    logger('green', `Bundled in ${seconds} seconds`);
  });
}