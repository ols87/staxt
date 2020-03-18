const fs = require('fs-extra');
const babel = require("@babel/core");

module.exports = function () {
  const js = babel.transformFileSync(`${this.paths.js}/main.js`);
  fs.ensureFileSync(`${this.paths.distAssets}/main.js`);
  fs.writeFileSync(`${this.paths.distAssets}/main.js`, js.code);
}