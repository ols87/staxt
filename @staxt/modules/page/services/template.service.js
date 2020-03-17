const inquirer = require('inquirer');
const walker = require(`${__staxt}/helpers/flie-walker.helper`);
const paths = require(`${__staxt}/helpers/paths.helper`);

const templateService = class {
  constructor(template = '') {
    this.template = template;
  }

  noArgs() {
    return walker(paths.templates).then(data => {
      data = data.map(path => {
        path = path.replace(`${paths.templates}/`, '');
        return (path.charAt(0).toUpperCase() + path.slice(1)).replace('.hbs', '');
      });

      const choices = ['Create New Template'].concat(data);

      return inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: `No template given`,
        choices: choices
      }])
    });
  }

  noFile() {
    return inquirer.prompt([{
      type: 'confirm',
      name: 'create',
      message: `${this.template} does not exist. Create it?`,
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