const compile = require('./pages/compile');
const scss = require('./assets/scss');
const js = require('./assets/js');
const images = require('./assets/images');

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