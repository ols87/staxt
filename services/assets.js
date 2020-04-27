const glob = require('../helpers/glob');
const paths = require('../config/paths');

const assets = {};

assets.all = (ext) => {
  return glob({
    dir: paths.src.assets[ext],
    includes: [`.${ext}`],
  });
};

module.exports = assets;
