const fs = require('fs-extra');
const babel = require("@babel/core");

module.exports = function () {
  let main = fs.readFileSync(`${this.paths.js}/main.js`, 'utf8');

  if (main === '') return;

  const test = /import\('\w+'\);/g;
  let match, imports = [];

  while ((match = test.exec(main)) !== null) {
    let file = match[0]
      .replace(/\.js/g, "")
      .replace(/"/g, "'")
      .replace(/import\('/g, '')
      .replace(/'\);/g, '')
    imports.push(file);
  }

  imports.forEach((file) => {
    if (!fs.pathExistsSync(`${this.paths.js}/${file}.js`)) {
      this.logger('red', `Unreadable import ${file}.js`);
      process.exit();
    }

    const contents = fs.readFileSync(`${this.paths.js}/${file}.js`, 'utf8');
    main = main
      .replace(/\.js/g, "")
      .replace(`import('${file}');`, `${contents}`);
  });

  fs.writeFileSync(`${this.paths.js}/bundle.js`, main);

  const js = babel.transformFileSync(`${this.paths.js}/bundle.js`, {
    presets: ["minify"]
  });

  fs.ensureFileSync(`${this.paths.distAssets}/main.js`);
  fs.writeFileSync(`${this.paths.distAssets}/main.js`, js.code);

  fs.removeSync(`${this.paths.js}/bundle.js`);
}