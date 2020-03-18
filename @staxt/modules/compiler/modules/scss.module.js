const fs = require('fs-extra');
const sass = require('sass');

module.exports = function () {
  sass.render({
    file: `${this.paths.scss}/main.scss`,
    outputStyle: 'compressed',
    outFile: `${this.paths.distAssets}/assets/main.css`
  }, (error, result) => {
    if (error) return;
    fs.ensureFileSync(`${this.paths.distAssets}/main.css`);
    fs.writeFileSync(`${this.paths.distAssets}/main.css`, result.css);
  });
}