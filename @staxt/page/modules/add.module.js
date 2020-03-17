const fs = require('fs-extra');
const inquirer = require('inquirer');

module.exports = function () {
  this.parser('add');

  const template = `${this.paths.templates}/${this.template}.hbs`;

  if (!this.args.t) {
    this.logger('blue', `No template give. using default`);
  }

  if (!fs.existsSync(template)) {
    inquirer
      .prompt([{
        type: 'confirm',
        name: 'createTemplate',
        message: `${this.template} does not exist. Create it?`,
        default: true,
      }])
      .then(answers => {
        if (answers.createTemplate) {
          fs.ensureFileSync(template);
        } else {
          this.template = 'default';
          this.logger('blue', `skipping template. using default`);
        }
      });
  }

  let data = JSON.stringify({
    template: this.template
  });

  data = data.replace(/"([^"]+)":/g, '$1:');

  const dataFile = `${this.filePath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFile(dataFile, dataContent);

  const scssFile = `${this.filePath}.scss`;
  const scssContent = `.${this.page}-page{}`;
  fs.outputFile(scssFile, scssContent);

  this.compile();
}