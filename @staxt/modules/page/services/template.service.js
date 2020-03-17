const inquirer = require('inquirer');
const loopDir = require(`${__staxt}/services/loopdir.service`);
const paths = require(`${__staxt}/services/paths.service`);

const templateService = class {
  constructor(template = '') {
    this.template = template;
  }

  noArgs() {
    return loopDir(paths.templates).then(data => {
      data = data.map(path => {
        path = path.replace(`${paths.templates}/`, '');
        path = path.charAt(0).toUpperCase() + path.slice(1);
        path = path.replace('.hbs', '');
        return (path.indexOf('_') !== 0 ? path : null);
      });

      const choices = ['Create New Template'].concat(data);

      return inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: `Choose a template`,
        choices: choices
      }])
    });
  }

  noFile(template = '') {
    return inquirer.prompt([{
      type: 'confirm',
      name: 'create',
      message: `${template} does not exist. Create it?`,
      default: true,
    }]);
  }

  create() {
    return inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: `Template name:`,
    }]);
  }
}

module.exports = (template = '') => {
  return new templateService(template);
}