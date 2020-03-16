const fs = require('fs-extra');
const handlebars = require('handlebars');

module.exports = function () {
  this.fileParser();
  const paths = this.paths;
  const template = `${paths.templates}/default.hbs`;
  const output = `${paths.dist}/${this.page}`;

  fs.readFile(template, 'utf8', (err, contents) => {
    const data = require(`${this.filePath}.js`);
    const compile = handlebars.compile(contents);
    const html = compile(data);

    fs.outputFileSync(`${output}/index.html`, html);
  });
}