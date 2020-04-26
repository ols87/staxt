const args = require('yargs').argv;

const templates = require(`${__staxt}/services/templates`);
const compile = require('../compile');

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    return compile.template(path);
  }

  templates.all('html').forEach((templatePath) => {
    let templateName = templates.sanitizePath(templatePath, 'html');
    compile.template(templateName);
  });
};
