const fs = require('fs-extra');
const dir = require('./dir');
const cleaner = require('./cleaner')

module.exports = new class {
  constructor() {
    this.assets = [
      `${dir.js}/main.js`,
      `${dir.css}/main.scss`,
    ];
    this.hbs = `${dir.hbs}/index.hbs`;
    this.json = `${dir.json}/index.json`;
  }

  all() {
    for (const path in dir) {
      if (!fs.existsSync(dir[path])) fs.mkdirSync(dir[path])
    }

    this.assets.forEach((file) => {
      if (!fs.existsSync(file)) fs.writeFileSync(file, '');
    });

    fs.copy('./staticly/index.hbs', this.hbs, err => {
      if (err) return console.error(err)
    });

    fs.copy('./staticly/index.json', this.json, err => {
      if (err) return console.error(err)
    });

    cleaner.clean(dir.pages);
  }
}