const fs = require('fs-extra');
const babel = require("@babel/core");

module.exports = function () {
  const js = babel.transformFileSync(`${this.paths.js}/main.js`);
  fs.writeFileSync(`${this.paths.dist}/assets/main.js`, js.code);
}