const staxt = require(`${__staxt}/staxt.module`);
const fs = require('fs-extra');
const shell = require('shelljs');

const init = class extends staxt {
  constructor() {
    super();
    const dirs = [
      this.paths.images,
      this.paths.includes,
      this.paths.dist
    ];

    const files = [
      `${this.paths.pages}/index.scss`,
      `${this.paths.scss}/main.scss`,
      `${this.paths.js}/main.js`
    ];

    dirs.forEach(dir => {
      fs.ensureDir(dir);
    });

    files.forEach(file => {
      fs.ensureFile(file);
    });

    fs.copySync(`${__dirname}/files/default.hbs`, `${this.paths.templates}/default.hbs`);
    fs.copySync(`${__dirname}/files/header.hbs`, `${this.paths.templates}/includes/header.hbs`);
    fs.copySync(`${__dirname}/files/footer.hbs`, `${this.paths.templates}/includes/footer.hbs`);
    fs.copySync(`${__dirname}/files/index.js`, `${this.paths.pages}/index.js`);

    shell.exec('staxt page compile -p=index');
  }
}

module.exports = () => {
  return new init();
}