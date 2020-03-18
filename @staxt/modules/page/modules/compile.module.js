const fs = require('fs-extra');
const handlebars = require(`${__staxt}/services/handlebars`);

module.exports = function () {
  this.parser('compile');

  const data = require(`${this.filePath}.js`);

  const paths = this.paths;
  const template = `${paths.templates}/${data.template}.hbs`;
  const output = this.isIndex ? paths.dist : `${paths.dist}/${this.page}`;

  fs.readFile(template, 'utf8', (err, contents) => {
    if (err) {
      this.logger('red', `${this.filePath} is referencing an inavlid template name`);
      this.logger('red', `${template} does not exist`);
      process.exit();
    }

    const compile = handlebars.compile(contents);
    const html = compile(data);

    fs.outputFile(`${output}/index.html`, html);
  });
}