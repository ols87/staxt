const fs = require('fs-extra');

const args = require('yargs').argv;
const paths = require('../helpers/paths');

module.exports = function (path = args.p) {
  fs.remove(`${paths.src.pages}/${path}`);
  fs.remove(`${paths.dist.base}/${path}`);
}