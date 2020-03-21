const fs = require('fs-extra');
const babel = require("@babel/core");

const paths = require('../helpers/paths');
const timer = require('../helpers/timer')();
const logger = require('../helpers/logger');

module.exports = function () {
  const src = paths.src.assets.js;
  const dist = paths.dist.assets.js;

  let main = fs.readFileSync(`${src}/main.js`, 'utf8');

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
    if (!fs.pathExistsSync(`${paths.src.assets.js}/${file}.js`)) {
      logger('red', `Unreadable import ${file}.js`);
      process.exit();
    }

    const contents = fs.readFileSync(`${src}/${file}.js`, 'utf8');
    main = main
      .replace(/\.js/g, "")
      .replace(`import('${file}');`, `${contents}`);
  });

  timer.start();

  fs.writeFileSync(`${src}/bundle.js`, main);

  const js = babel.transformFileSync(`${src}/bundle.js`, {
    cwd: __staxt,
    presets: ["minify"]
  });

  fs.ensureFileSync(`${dist}/main.js`);
  fs.writeFileSync(`${dist}/main.js`, js.code);

  fs.removeSync(`${src}/bundle.js`);

  timer.end().then(seconds => {
    logger('green', `Javascript compiled in ${seconds} seconds`);
  });
}