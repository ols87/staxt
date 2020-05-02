const args = require('yargs').argv;

const bundle = require('./bundle');

const paths = require('../helpers/paths');
const fileWatcher = require('../helpers/file-watcher');
const config = require(`../helpers/config`);

module.exports = async function serve() {
  await bundle();

  const server = require('browser-sync').create();

  await config.hooks.serve.before();

  if (!args.w) {
    server.init(
      {
        server: paths.dist.base,
        open: !args.q,
      },
      async () => {
        server.watch(paths.src.base, { ignoreInitial: true }, (event, path) => {
          if (event === 'add' || event === 'change') {
            fileWatcher(path);
            server.reload();
          }
        });

        return await config.hooks.serve.after();
      }
    );
  }
};
