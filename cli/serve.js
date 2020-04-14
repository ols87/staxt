const args = require('yargs').argv;

const watch = require('./watch');
const bundle = require('./bundle');

const paths = require('../helpers/paths');

module.exports = () => {
  bundle();

  const server = require('browser-sync').create();

  server.init({
    server: paths.dist.base,
    open: !args.q,
  });

  watch(server);
};
