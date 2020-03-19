const fs = require('fs-extra');
const babel = require("@babel/core");
const minify = require("babel-minify");

module.exports = function () {
  let main = fs.readFileSync(`${this.paths.js}/main.js`, 'utf8');
  let imports = main
    .replace(/\.js/g, "")
    .replace(/"/g, "'")
    .replace(/import\('/g, '')
    .replace(/'\);/g, '')
    .split(/[\r\n]+/);

  imports.forEach((file) => {
    if (!fs.pathExistsSync(`${this.paths.js}/${file}.js`)) {
      this.logger('red', `Unreadable import ${file}.js`);
      process.exit();
    }

    const contents = fs.readFileSync(`${this.paths.js}/${file}.js`, 'utf8');
    main = main
      .replace(/\.js/g, "")
      .replace(`import('${file}');`, `${contents}\r\n\r\n`);
  });

  console.log(main);

  fs.writeFileSync(`${this.paths.js}/bundle.js`, main);
  const js = babel.transformFileSync(`${this.paths.js}/bundle.js`);

  const {
    code
  } = minify(js.code);

  fs.ensureFileSync(`${this.paths.distAssets}/main.js`);
  fs.writeFileSync(`${this.paths.distAssets}/main.js`, code);

  fs.removeSync(`${this.paths.js}/bundle.js`);
}