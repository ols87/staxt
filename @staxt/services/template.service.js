const inquirer = require('inquirer');
const glob = require("glob");

const paths = require(`${__staxt}/services/paths.service`);

const templateService = class {
  constructor(template = '') {
    this.template = template;
  }

  invalid(create = false) {
    const choices = this.list();
    if (create) choices.unshift('Create New Template');

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
      path = path.charAt(0).toUpperCase() + path.slice(1);
      path = path.replace('.hbs', '');
      if (path.indexOf('_') !== 0) list.push(path);
    });

    return list;
  }
}

module.exports = (template = '') => {
  return new templateService(template);
}