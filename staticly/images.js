const fs = require('fs-extra');

module.exports = new class {
  copy() {
    fs.copy('src/images', 'dist/assets/images', err => {
      if (err) return console.error(err)
    });
  }
}