const fs = require('fs-extra');

module.exports = function () {
  fs.copy(this.paths.images, `${this.paths.dist}/assets/images`, err => {
    if (err) return console.error(err)
  });
}