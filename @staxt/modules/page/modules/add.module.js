const fs = require('fs-extra');

const _templateService = require(`${__staxt}/services/template.service`);
const _timer = require(`${__staxt}/services/timer.service`);

module.exports = function () {
  this.parser('add');

  const templateService = _templateService(this.template);
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

    const timer = _timer();
    timer.start();
    this.compile();

    timer.end().then(seconds => {
      this.logger('green', `${this.page} files created`);
    });
  }

  if (!this.args.t) {
    return templateService.noArg().then(res => {
      if (res.choice === 'Create New Template') {
        return templateService.create().then(res => {
          console.log(res)
          if (res.name !== '') {
            const placeholder = `${__staxt}/modules/init/files/default.hbs`;
            const newPath = `${this.paths.templates}/${res.name}.hbs`;
            this.template = res.name;
            fs.copySync(placeholder, newPath);
            return addFiles(res.name);
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