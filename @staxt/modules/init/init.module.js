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

    fs.outputFileSync(`${this.paths.templates}/default.hbs`, 'Staxt static site generator');

    const index = `${this.paths.pages}/index.js`;
    const content = `const data = {template: "default"};\r\n\r\nmodule.exports = data;`;

    fs.outputFile(index, content, () => {
      shell.exec('staxt page compile -p=index');
    });
  }
}

module.exports = () => {
  return new init();
}