const fs = require('fs-extra');

const staxtConfig = require('../files/staxt.config');
const projectConf = `${process.cwd()}/files/staxt.config.js`;

let config = staxtConfig;

if (fs.existsSync(projectConf)) {
  config = Object.assign({}, staxtConfig, require(projectConf));
}

config = Object.assign(
  {
    paths: {
      base: process.cwd(),
      src: {
        base: 'src',
        templates: 'templates',
        includes: 'includes',
        pages: 'pages',
        assets: {
          base: 'assets',
          js: 'js',
          scss: 'scss',
          images: 'images',
        },
      },
      dist: {
        base: 'dist',
        assets: {
          base: 'assets',
          js: 'js',
          css: 'css',
          images: 'images',
        },
      },
    },
  },
  config
);

module.exports = config;
