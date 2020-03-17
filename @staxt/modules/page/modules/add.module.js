const fs = require('fs-extra');
const service = require('../services/template.service');

module.exports = function () {
  this.parser('add');

  const templateService = service(this.template);
  const templatePath = `${this.paths.templates}/${this.template}.hbs`;

  const addFiles = (templateName = '') => {
    this.template = templateName.toLowerCase();

    let data = JSON.stringify({
      template: this.template
    });

    data = data.replace(/"([^"]+)":/g, '$1:');

    const dataFile = `${this.filePath}.js`;
    const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
    fs.outputFileSync(dataFile, dataContent);

    const scssFile = `${this.filePath}.scss`;
    const scssContent = `.${this.page}-page{}`;
    fs.outputFileSync(scssFile, scssContent);

    this.logger('green', `${this.page} src files created`);
    this.compile();
  }

  if (!this.args.t) {
    return templateService.noArgs().then(res => {
      if (res.choice === 'Create New Template') {
        return templateService.create().then(res => {
          if (res.name !== '') {
            const newPath = this.templatePath.replace(this.template, res.name);
            fs.ensureFileSync(newPath);
            addFiles(res.name);
          }
          this.logger('red', `Please enter a template name`);
        });
      }
      addFiles(res.choice);
    });
  }

  if (!fs.existsSync(templatePath)) {
    return templateService.noFile().then(res => {
      if (res.create) return fs.ensureFileSync(templatePath);
      this.logger('blue', `skipping template. using default`);
      addFiles('default');
    });
  }
}