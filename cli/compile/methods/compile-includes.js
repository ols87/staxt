const args = require('yargs').argv;
const fs = require('fs-extra');

const templates = require(`${__staxt}/services/templates`);
const compile = require('../compile');

module.exports = (path = args.i) => {
  templates.all('html').forEach((templatePath) => {
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    templateContent = templateContent.replace(/s/g,'');

    if(templateContent.indexOf(`${path}')}}`) > -1) {
      compile.template(templatePath);
    }
  });
};
