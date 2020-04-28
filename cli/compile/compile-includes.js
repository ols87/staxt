const fs = require('fs-extra');
const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);
const templateService = require(`${__staxt}/services/template`);

module.exports = (filePath = args.i) => {
  if (typeof filePath !== 'string') {
    return;
  }

  templateService.getAll('html').forEach((templatePath) => {
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    templateContent = templateContent.replace(/\s/g, '');

    if (templateContent.indexOf(`${filePath}')}}`) > -1) {
      let templateName = templateService.sanitizePath(templatePath, 'html');
      compileService.template(templateName);
    }
  });
};
