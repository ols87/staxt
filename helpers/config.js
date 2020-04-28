const fs = require('fs-extra');

const staxtConfig = require('../files/staxt.config');
const projectConfig = `${process.cwd()}/staxt.config.js`;

const objectMerge = require('./object-merge');

let config = staxtConfig;

if (fs.existsSync(projectConfig)) {
  config = objectMerge(staxtConfig, require(projectConfig));
}

module.exports = objectMerge(
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
