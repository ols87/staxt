const chokidar = require('chokidar');

const compile = require('./compile');
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
        if (isImg) return this.images();

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
  scss: function () {},
  images: function () {}
}

if (require.main === module) {
  watch.init();
} else {
  module.exports = watch;
}