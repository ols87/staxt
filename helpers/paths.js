const config = require(`./config`);
const path = require('path');

const paths = config.paths;
const base = path.normalize(paths.base);

const src = paths.src;
const dist = paths.dist;

const directory = {
  src: `${base}/${src.base}`,
  dist: `${base}/${dist.base}`,
};

const assets = {
  src: `${directory.src}/${src.assets.base}`,
  dist: `${directory.dist}/${dist.assets.base}`,
};

module.exports = {
  base: path.normalize(paths.base),
  src: {
    base: directory.src,
    templates: `${directory.src}/${src.templates}`,
    includes: `${directory.src}/${src.templates}/${src.includes}`,
    pages: `${directory.src}/${src.pages}`,
    assets: {
      base: assets.src,
      js: `${assets.src}/${src.assets.js}`,
      scss: `${assets.src}/${src.assets.scss}`,
      images: `${assets.src}/${src.assets.images}`,
    },
  },
  dist: {
    base: directory.dist,
    assets: {
      base: assets.dist,
      js: `${assets.dist}/${dist.assets.js}`,
      scss: `${assets.dist}/${dist.assets.scss}`,
      images: `${assets.dist}/${dist.assets.images}`,
    },
  },
};
