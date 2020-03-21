const chokidar = require('chokidar');

const compile = require('./compile');
const scss = require('./scss');
const js = require('./js');
const images = require('./images');

const paths = require('../helpers/paths');

const watch = {
  init: function (server) {
    this.server = server;

    chokidar.watch(paths.src.base, {
      ignoreInitial: true
    }).on('all', (event, path) => {
      if (event == 'add' || event == 'change') {
        const isPage = path.indexOf('pages') > -1;
        const isImg = path.indexOf('images') > -1;

        let type = path.split('/');
        type = type[type.length - 1];
        type = type.split('.').pop();

        if (isPage && type === 'js') return this.page(path);
        if (isImg) return this.images(type);

        this[type]();
      }
    });
  },
  page: function (path = '') {
    path = path.replace(`${paths.src.pages}/`, '');
    path = path.split('.')[0];
    compile(path);
    this.server.reload('**/**.html');
  },
  hbs: function () {
    compile();
    this.server.reload('**/**.html');
  },
  js: function () {
    js();
    this.server.reload('**/**.js');
  },
  scss: function () {
    scss();
    this.server.reload('**/**.css');
  },
  images: function (type = '') {
    images();
    this.server.reload(`**/**.${type}`);
  }
}

if (require.main === module) {
  watch.init();
} else {
  module.exports = watch;
}