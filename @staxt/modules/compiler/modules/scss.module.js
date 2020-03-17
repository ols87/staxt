const fs = require('fs-extra');
const sass = require('sass');

module.exports = function () {
  sass.render({
    file: `${this.paths.scss}/main.scss`,
    outputStyle: 'compressed',
    outFile: `${this.paths.dist}/assets/main.css`
  }, (error, result) => {
    if (error) return
    fs.writeFileSync(`${this.paths.dist}/assets/main.css`, result.css);
  });
}