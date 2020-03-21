const staxtConfig = require('../staxt.config');

const config = staxtConfig;

const paths = config.paths
const base = paths.base;

const src = paths.src;
const dist = paths.dist;

const dir = {
  src: `${base}/${src.base}`,
  dist: `${base}/${dist.base}`
};

const assets = {
  src: `${dir.src}/${src.assets.base}`,
  dist: `${dir.dist}/${dist.assets.base}`
};

module.exports = {
  base: paths.base,
  src: {
    base: dir.src,
    templates: `${dir.src}/${src.templates}`,
    includes: `${dir.src}/${src.templates}/${src.includes}`,
    pages: `${dir.src}/${src.pages}`,
    assets: {
      base: assets.src,
      js: `${assets.src}/${src.assets.js}`,
      scss: `${assets.src}/${src.assets.scss}`,
      images: `${assets.src}/${src.assets.images}`,
    }
  },
  dist: {
    base: dir.dist,
    assets: {
      base: assets.dist,
      js: `${assets.dist}/${dist.assets.js}`,
      css: `${assets.dist}/${dist.assets.css}`,
      images: `${assets.dist}/${dist.assets.images}`,
    }
  }
}