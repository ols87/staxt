const fs = require('fs-extra');
const chokidar = require('chokidar');

const config = require('../helpers/config');

const extension = config.dot.templateSettings.varname;

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
        const isPage = path.indexOf(`.${extension}.js`) > -1;
        const isImage = path.indexOf(paths.src.assets.images) > -1;
        const fileType = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);

        let type, script;

        for (let [key, value] of Object.entries(dirs)) {
          type = path.indexOf(value) > -1 ? key : type;
        }

        if (fileType === 'html' || isPage) {
          script = 'compile';
        }

        if (fileType === 'js' && !isPage) {
          script = 'scripts';
        }

        if (fileType === 'scss' && !isPage) {
          script = 'styles';
        }

        if (isImage) {
          script = 'images';
        }

        const method = `${__staxt}/${type}/${script}`;
        const name = path.split('/').pop().replace(/\.\w+/g, '');

        if (fs.existsSync(`${method}.js`)) {
          require(method)(name);
          delete require.cache[require.resolve(method)];
        }

        if (server) {
          server.reload();
        }
      }
    });
};
