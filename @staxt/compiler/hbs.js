const fs = require('fs-extra');
const staxt = require('../staxt');
const handlebars = require('handlebars');

module.exports = new class extends staxt {
  constructor() {
    super()
  }

  compile() {
    // TODO:
    // Dynamic paths
    fs.readFile(`${this.paths.templates}/default.hbs`, 'utf8', (err, contents) => {
      const data = require(`${this.paths.pages}/foo/bar/bar`);
      const compile = handlebars.compile(contents);
      const html = compile(data);

      fs.outputFileSync(`${this.paths.dist}/foo/bar/index.html`, html);
    });
  }
}