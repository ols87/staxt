const fs = require('fs-extra');

module.exports = function () {
  const paths = this.paths;
  const page = this.args.p;

  fs.removeSync(`${paths.pages}/${page}`);
  fs.removeSync(`${paths.dist}/${page}`);
}