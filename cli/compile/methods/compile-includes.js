const args = require('yargs').argv;
const fs = require('fs-extra');

const templates = require(`${__staxt}/services/templates`);
const compile = require('../compile');

module.exports = (path = args.i) => {
  templates.all('html').forEach((templatePath) => {
    console.log(fs.readFileSync(templatePath, 'utf8'));
  });
};
