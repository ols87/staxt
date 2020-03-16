const fs = require('fs-extra');

module.exports = function () {
  this.fileParser();
  const paths = this.paths;

  fs.removeSync(`${paths.pages}/${this.page}`);
  fs.removeSync(`${paths.dist}/${this.page}`);
}