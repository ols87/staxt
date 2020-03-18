const fs = require('fs-extra');

module.exports = function () {
  fs.copySync(this.paths.images, `${this.paths.dist}/assets/images`);
}