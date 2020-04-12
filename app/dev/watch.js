const chokidar = require('chokidar');

const assets = {
  scss: require('../assets/styles'),
  scripts: require('../assets/scripts'),
  images: require('../assets/images'),
};

const paths = require('../helpers/paths');

const dirs = {
  templates: paths.src.templates,
  includes: paths.src.includes,
  pages: paths.src.pages,
  assets: paths.src.assets.base,
};

module.exports = (server) => {
  return chokidar
    .watch(paths.src.base, {
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event == 'add' || event == 'change') {
        const type = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
        let compiler;

        for (let [key, value] of Object.entries(dirs)) {
          if (path.indexOf(value) > -1) {
            compiler = key;
          }
        }

        console.log(compiler);

        if (server) {
          server.reload();
        }
      }
    });
};
