const fs = require('fs-extra');

module.exports = function () {
  this.parser();
  const paths = this.paths;

  fs.remove(`${paths.pages}/${this.page}`);
  fs.remove(`${paths.dist}/${this.page}`);
}