const args = require('yargs').argv;

const templateService = require(`${__staxt}/services/template`);
const compileService = require(`${__staxt}/services/compile`);

module.exports = (filePath = args.t) => {
  if (typeof filePath === 'string') {
    return compileService.template(filePath);
  }

  templateService.getAll('html').forEach((templatePath) => {
    let templateName = templateService.sanitizePath(templatePath, 'html');
    compileService.template(templateName);
  });
};
