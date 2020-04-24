const args = require('yargs').argv;

const watch = require('../helpers/watch');
const paths = require('../helpers/paths');

module.exports = () => {
  // bundle();

  const server = require('browser-sync').create();

  if (!args.w) {
    server.init({
      server: paths.dist.base,
      open: !args.q,
    });
  }

  server.watch(paths.src.base, { ignoreInitial: true }, (event, path) => {
    if (event === 'add' || event === 'change') {
      watch(path);
      server.reload();
    }
  });
};
