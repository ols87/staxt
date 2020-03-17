const fs = require('fs-extra');
const service = require('../services/template.service');

module.exports = function () {
  this.parser('add');

  const templateService = service(this.template);
  const templatePath = `${this.paths.templates}/${this.template}.hbs`;

  const addFiles = () => {
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

    this.logger('green', `${this.page} src files created`);

    this.compile();
  }

  if (!this.args.t) {
    templateService.noArgs().then(res => {
      const choice = res.choice;
      if (choice === 'Create New Template') {
        templateService.create().then(res => {
          if (res.name !== '') {
            const newPath = this.templatePath.replace(this.template, res.name);
            fs.ensureFileSync(newPath);
            this.template = res.name.toLowerCase();
            addFiles();
          } else {
            this.logger('red', `Please enter a template name`);
          }
        });
      } else {
        this.template = res.choice.toLowerCase();
        addFiles();
      }
    });
  }

  if (!fs.existsSync(templatePath)) {
    templateService.noFile().then(res => {
      if (res.create) return fs.ensureFileSync(templatePath);
      this.template = 'default';
      this.logger('blue', `skipping template. using default`);
      addFiles();
    });
  }
}