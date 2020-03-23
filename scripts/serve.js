const args = require('yargs').argv;

const watch = require('./watch');
const paths = require('../helpers/paths');

module.exports = function () {
  this.server = require("browser-sync").create();

  this.server.init({
    server: paths.dist.base,
    open: !args.q
  });

  watch(this.server);
}