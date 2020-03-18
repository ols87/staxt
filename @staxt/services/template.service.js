const inquirer = require('inquirer');
const glob = require("glob");

const paths = require(`${__staxt}/services/paths.service`);

const templateService = class {
  constructor(template = '') {
    this.template = template;
  }

  noArg() {
    const choices = this.list();
    choices.unshift('Create new');

    return inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: `Choose a template`,
      choices: choices
    }]);
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

  list() {
    const list = [];

    const templates = glob.sync(`${paths.templates}/**/**.hbs`, {
      ignore: '*.include.hbs'
    });

    templates.forEach(path => {
      path = path.replace(`${paths.templates}/`, '');
      path = path.replace('.hbs', '');
      if (path.indexOf('includes') !== 0) list.push(path);
    });

    return list;
  }
}

module.exports = (template = '') => {
  return new templateService(template);
}