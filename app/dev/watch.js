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

const types = {
  compile: () => {},
  scripts: () => {},
  styles: () => {},
};

module.exports = (server) => {
  return chokidar
    .watch(paths.src.base, {
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event == 'add' || event == 'change') {
        const type = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
        let dir;

        for (let [key, value] of Object.entries(dirs)) {
          dir = path.indexOf(value) > -1 ? key : dir;
        }

        switch (type) {
          case 'js':
            break;
          case y:
            // code block
            break;
          default:
          // code block
        }
        if (server) {
          server.reload();
        }
      }
    });
};
