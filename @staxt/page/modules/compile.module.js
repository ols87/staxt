const fs = require('fs-extra');
const handlebars = require('handlebars');

module.exports = function () {
  this.parser('compile');

  const paths = this.paths;
  const template = `${paths.templates}/${this.template}.hbs`;
  const output = this.isIndex ? paths.dist : `${paths.dist}/${this.page}`;

  fs.readFile(template, 'utf8', (err, contents) => {
    const data = require(`${this.filePath}.js`);
    const compile = handlebars.compile(contents);
    const html = compile(data);

    fs.outputFile(`${output}/index.html`, html);
  });
}