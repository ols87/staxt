const chokidar = require('chokidar');

const compile = require('./pages/compile');
const scss = require('./assets/scss');
const js = require('./assets/js');
const images = require('./assets/images');

const paths = require('../helpers/paths');

const compiler = {
  page: (path = '') => {
    path = path.replace(`${paths.src.pages}/`, '').split('.')[0];
    compile(path);
  },
  hbs: compile,
  js: js,
  scss: scss,
  images: images,
}

function watch(server) {
  chokidar.watch(paths.src.base, {
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event == 'add' || event == 'change') {
      const isPage = path.indexOf('pages') > -1;
      const isImg = path.indexOf('images') > -1;

      let type = path.split('/');
      type = type[type.length - 1];
      type = type.split('.').pop();

      if (isPage && type === 'js') return compiler.page(path);

      compiler[type]();

      if (server) {
        server.reload();
      }
    }
  });
}

module.exports = watch;