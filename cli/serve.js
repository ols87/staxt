const args = require('yargs').argv;

const bundle = require('./bundle');

const paths = require('../helpers/paths');
const fileWatcher = require('../helpers/file-watcher');

module.exports = async function serve() {
  bundle();

  const server = require('browser-sync').create();

  if (!args.w) {
    server.init({
      server: paths.dist.base,
      open: !args.q,
    });
  }

  server.watch(paths.src.base, { ignoreInitial: true }, (event, path) => {
    if (event === 'add' || event === 'change') {
      fileWatcher(path);
      server.reload();
    }
  });
};
