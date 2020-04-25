const args = require('yargs').argv;

const templates = require(`${__staxt}/services/templates`);
const compile = require('../compile.service');

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    return compile.template(path);
  }

  templates.all('html').forEach((templatePath) => {
    let name = templates.sanitize(templatePath, 'html');
    compile.template(name);
  });
};
