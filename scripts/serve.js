const args = require("yargs").argv;

const watch = require("./watch");
const bundle = require("./bundle");

const paths = require("../helpers/paths");

module.exports = function() {
  bundle();

  this.server = require("browser-sync").create();

  this.server.init({
    server: paths.dist.base,
    open: !args.q
  });

  watch(this.server);
};
