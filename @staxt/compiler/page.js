const fs = require('fs-extra');
const staxt = require('../staxt');
const hbs = require('./hbs');

module.exports = new class extends staxt {
  constructor() {
    super()
  }

  page() {
    // TODO:
    // Only create page if not exists
    // Dynamic paths
    let data = JSON.stringify({
      template: 'default'
    });
    data = data.replace(/"([^"]+)":/g, '$1:');

    const dataFile = `${this.paths.pages}/foo/bar/bar.js`;
    const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
    fs.outputFileSync(dataFile, dataContent);

    const scssFile = `${this.paths.pages}/foo/bar/bar.scss`;
    const scssContent = '.bar-page{}';
    fs.outputFileSync(scssFile, scssContent);

    hbs.compile();
  }
}